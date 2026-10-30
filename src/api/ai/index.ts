// 导入请求方法
import { post } from "@/api/request";
// 导入 SSE 请求封装
import { sseRequest } from "@/api/sseRequest";
// 导入通用响应类型
import type { ApiResponse } from "@/api/request";
import type { SSEReturn } from "@/api/sseRequest";
// 导入 AI 对话类型
import type { IAiChatParams, IAiChatResult } from "@/interface/ai";

/** AI 请求超时时间（毫秒）：大模型生成较慢，覆盖全局 10s 超时 */
const AI_TIMEOUT = 60 * 1000;
/** 流式请求超时时间（毫秒）：需覆盖首包等待 + 全文生成的总时长 */
const AI_STREAM_TIMEOUT = 120 * 1000;

/** 非流式问答 */
export function chatApi(
  params: IAiChatParams,
): Promise<ApiResponse<IAiChatResult>> {
  return post<IAiChatResult>("/api/v1/ai/chat", params, {
    timeout: AI_TIMEOUT,
  });
}

/** 流式问答回调 */
export interface IChatStreamHandlers {
  /** 收到增量文本片段 */
  onDelta: (delta: string) => void;
  /** 出错（HTTP / 网络 / 业务错误），消息已转为人话 */
  onError?: (message: string) => void;
}

/** 流式问答参数：通用对话参数 + 流式回调 */
export type IChatStreamParams = IAiChatParams & IChatStreamHandlers;

/** SSE 单条消息解析结果 */
interface ISSEParsed {
  /** 增量文本 */
  delta: string;
  /** 是否为结束标记 */
  done: boolean;
  /** 业务错误消息（code 非 0） */
  errorMessage?: string;
}

/**
 * 解析 SSE 单条消息，兼容三种格式：
 * - JSON 信封：{"code":0,"message":"success","data":{"content":"增量文本"}}
 * - 结束标记：data 为 [DONE]
 * - 非 JSON：整段按纯文本增量处理
 */
function parseSSEMessage(raw: string): ISSEParsed {
  const text = (raw ?? "").trim();
  if (!text || text === "[DONE]") {
    return { delta: "", done: true };
  }
  try {
    const json = JSON.parse(text);
    if (json && typeof json === "object") {
      // 业务错误：code 非 0
      if (typeof json.code === "number" && json.code !== 0) {
        return {
          delta: "",
          done: true,
          errorMessage: json.message || "AI 服务异常",
        };
      }
      const payload = json.data ?? json;
      const delta =
        payload?.content ?? payload?.answer ?? payload?.text ?? payload?.delta;
      return { delta: typeof delta === "string" ? delta : "", done: false };
    }
    return { delta: "", done: true };
  } catch {
    // 非 JSON：按纯文本增量处理
    return { delta: raw, done: false };
  }
}

/** 流式问答：回答以增量文本逐段回调 */
export function chatStreamApi(params: IChatStreamParams): SSEReturn {
  const { onDelta, onError, ...rest } = params;
  const token = localStorage.getItem("token");

  const handle = sseRequest({
    url: "/api/v1/ai/chat/stream",
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: rest,
    timeout: AI_STREAM_TIMEOUT,
    onMessage(data) {
      const { delta, done, errorMessage } = parseSSEMessage(data);
      // 业务错误：通知外层后中止接收，避免继续渲染无效内容
      if (errorMessage) {
        onError?.(errorMessage);
        handle?.abort();
        return;
      }
      if (done || !delta) return;
      onDelta(delta);
    },
    onError(error) {
      // 连接阶段失败：HTTP_xxx / SSE_NOT_STREAM / 网络异常统一转人话
      const raw = error instanceof Error ? error.message : "";
      const message =
        raw.startsWith("HTTP_") || raw.startsWith("SSE_")
          ? "服务繁忙，请稍后再试"
          : raw || "网络异常，请稍后重试";
      onError?.(message);
    },
  });

  return handle;
}
