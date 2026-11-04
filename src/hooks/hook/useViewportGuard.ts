import { useEffect } from "react";

/**
 * iOS WebView 视口守卫
 *
 * 问题背景：body 已设 overflow:hidden 且内容不超高，正常情况下页面级不可滚动。
 * 但 iOS WKWebView 存在已知问题：
 * 1. 输入框聚焦键盘弹起时，WebView 会强行上推整页（即使 body 不可滚动）；
 * 2. 键盘收起 / 返回页面后，上推位移残留不复位（window.scrollY 非 0），
 *    导致顶部导航栏被顶出屏幕外，露出 body 白色背景。
 *
 * 处理策略（v2，真机验证修正）：
 * - 不再监听 window scroll 做"异常位移"立即复位——它会把 WebView 键盘
 *   弹起时的正常上推误判为异常并拉回，导致输入框永远顶不起来（实测：
 *   禁用该逻辑后页面正常顶起）；
 * - 只保留键盘收起（可视高度恢复）与输入框失焦后的延迟复位，消除收起
 *   后页面未完全回位的残留。
 */
export function useViewportGuard() {
  useEffect(() => {
    const visualViewport = window.visualViewport;
    // 上一次可视高度，用于识别键盘收起（高度恢复）
    let prevHeight = visualViewport?.height ?? window.innerHeight;
    let timers: number[] = [];

    const clearTimers = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [];
    };

    const resetWindowScroll = () => {
      const scrollingElement = document.scrollingElement;
      if (
        window.scrollY !== 0 ||
        (scrollingElement && scrollingElement.scrollTop !== 0)
      ) {
        window.scrollTo(0, 0);
      }
    };

    // 键盘收起（可视高度变大）后，复位 WebView 残留的页面位移
    const onVisualViewportResize = () => {
      if (!visualViewport) return;
      const height = visualViewport.height;
      if (height > prevHeight + 1) {
        clearTimers();
        // WebView 收起键盘后布局恢复存在延迟，分多个时点兜底复位
        timers = [100, 300, 600].map((delay) =>
          window.setTimeout(resetWindowScroll, delay),
        );
      }
      prevHeight = height;
    };

    // 输入框失焦（键盘可能随之收起）后兜底复位
    const onFocusOut = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        clearTimers();
        timers = [200, 500].map((delay) =>
          window.setTimeout(resetWindowScroll, delay),
        );
      }
    };

    visualViewport?.addEventListener("resize", onVisualViewportResize);
    document.addEventListener("focusout", onFocusOut);

    return () => {
      clearTimers();
      visualViewport?.removeEventListener("resize", onVisualViewportResize);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);
}
