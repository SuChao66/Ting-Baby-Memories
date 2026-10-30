// 导入请求方法
import { post } from "@/api/request";
// 导入通用响应类型
import type { ApiResponse } from "@/api/request";
// 导入 AI 对话类型
import type { IAiChatParams, IAiChatResult } from "@/interface/ai";

/** AI 请求超时时间（毫秒）：大模型生成较慢，覆盖全局 10s 超时 */
const AI_TIMEOUT = 60 * 1000;

/** 非流式问答 */
export function chatApi(
  params: IAiChatParams,
): Promise<ApiResponse<IAiChatResult>> {
  return post<IAiChatResult>("/api/v1/ai/chat", params, {
    timeout: AI_TIMEOUT,
  });
}
