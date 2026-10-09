import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export function useNProgress(delay: number = 300) {
  const location = useLocation();

  useEffect(() => {
    NProgress.configure({
      showSpinner: false, // 隐藏右上角的加载图标
      minimum: 0.2, // 初始最小百分比
      speed: 500, // 动画速度(ms)
    });

    // 1. 路由发生变化时，开始进度条
    NProgress.start();

    // 2. 设置一个短暂的延迟后完成进度条
    // 因为 react-router-dom 的路由切换通常是瞬间完成的，
    // 加一点延迟可以让进度条动画看起来更自然
    const timer = setTimeout(() => {
      NProgress.done();
    }, delay);

    // 3. 清理函数：组件卸载或下一次路由变化前，清除定时器并强制结束进度条
    return () => {
      clearTimeout(timer);
      NProgress.done(true); // 传入 true 表示强制结束
    };
  }, [location.pathname]); // 仅当路径发生变化时触发
}
