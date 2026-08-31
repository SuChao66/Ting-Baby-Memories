// 导入路由相关方法
import { Navigate, Outlet } from "react-router-dom";
// 导入用户状态
import { useUserStore } from "@/store";

// 路由鉴权组件：未登录则跳转到登录页
export function AuthRoute() {
  const isLogin = useUserStore((state) => state.isLogin);
  // 未登录则跳转到登录页
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }
  // 登录则渲染子路由
  return <Outlet />;
}
