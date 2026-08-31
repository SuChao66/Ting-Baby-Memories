import type { NavigateFunction } from "react-router-dom";

// 1. 定义一个模块级变量，用来保存 navigate 函数的引用
let globalNavigate: NavigateFunction | null = null;

// 2. 暴露一个初始化方法（供根组件调用）
export const initRouter = (navigate: NavigateFunction) => {
  globalNavigate = navigate;
};

// 3. 暴露一个可以在任何 ts 文件中调用的跳转方法
export const navigateTo = (path: string) => {
  if (!globalNavigate) {
    console.error("路由未初始化，请检查是否在根组件中调用了initRouter");
    return;
  }
  globalNavigate(path);
};
