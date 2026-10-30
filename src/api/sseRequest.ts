import { fetchEventSource } from "@microsoft/fetch-event-source";

export interface SSEOptions {
  url: string;
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: unknown;
  openWhenHidden?: boolean;
  timeout?: number;
  /** 出错后是否自动重连：true 按库默认策略重试；默认 false，出错即终止（流式对话重试会导致答案重复追加） */
  retry?: boolean;
  onOpen?: (response: Response) => void;
  onMessage: (data: string, event: any) => void;
  onClose?: () => void;
  onError?: (error: unknown) => void;
}

export interface SSEReturn {
  abort: () => void;
  promise: Promise<void>;
}

export function sseRequest(options: SSEOptions): SSEReturn {
  const {
    url,
    method = "POST",
    headers,
    body,
    openWhenHidden = true,
    timeout,
    retry = false,
    onOpen,
    onMessage,
    onClose,
    onError,
  } = options;

  // 每次请求必须新建 AbortController，不能复用
  const controller = new AbortController();

  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  // 设置超时
  if (timeout && timeout > 0) {
    timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);
  }

  const promise = fetchEventSource(url, {
    method,
    signal: controller.signal,
    openWhenHidden,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    async onopen(response) {
      if (response.ok) {
        const contentType = response.headers.get("content-type") || "";

        if (!contentType.includes("text/event-stream")) {
          // 兼容非流式错误，例如 200 但返回 JSON 错误
          try {
            const text = await response.text();
            console.warn("[SSE] 非流式响应:", text);
          } catch {
            // ignore
          }
          onError?.(new Error("SSE_NOT_STREAM"));
          controller.abort();
          return;
        }

        onOpen?.(response);
      } else {
        // 处理 4xx / 5xx 等非成功状态
        try {
          const text = await response.text();
          console.error(`[SSE] HTTP ${response.status}:`, text);
        } catch {
          console.error(`[SSE] HTTP ${response.status}`);
        }
        onError?.(new Error(`HTTP_${response.status}`));
        controller.abort();
      }
    },
    onmessage(event) {
      try {
        onMessage(event.data, event);
      } catch (error) {
        console.error("[SSE] onMessage 处理失败:", error);
      }
    },
    onclose() {
      if (timeoutId) clearTimeout(timeoutId);
      onClose?.();
    },
    onerror(error) {
      if (timeoutId) clearTimeout(timeoutId);
      onError?.(error);
      // 默认抛出错误终止重连；retry 为 true 时返回 undefined 按库默认策略重试
      if (!retry) throw error;
      return undefined;
    },
  });

  return {
    abort: () => controller.abort(),
    promise,
  };
}
