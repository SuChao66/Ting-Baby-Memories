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
 * 处理策略：
 * - 键盘弹起期间不干预，避免把正在输入的内容推到键盘下方；
 * - 键盘收起（可视高度恢复）、输入框失焦、非键盘状态下的异常滚动时，
 *   分多个时点复位页面滚动到顶部。
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

    // 键盘是否处于弹起状态（可视高度明显小于窗口高度）
    const isKeyboardVisible = () => {
      if (!visualViewport) return false;
      return visualViewport.height < window.innerHeight * 0.75;
    };

    // 非键盘状态下，body 本应不可滚动，出现窗口级滚动即为异常位移，立即复位
    const onWindowScroll = () => {
      if (isKeyboardVisible()) return;
      requestAnimationFrame(resetWindowScroll);
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

    window.addEventListener("scroll", onWindowScroll, { passive: true });
    visualViewport?.addEventListener("resize", onVisualViewportResize);
    document.addEventListener("focusout", onFocusOut);

    return () => {
      clearTimers();
      window.removeEventListener("scroll", onWindowScroll);
      visualViewport?.removeEventListener("resize", onVisualViewportResize);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);
}
