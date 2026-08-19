// 导入路由方法
import { createHashRouter, Navigate } from "react-router-dom";
import React from "react";
// 导入路由鉴权组件
import { AuthRoute } from "./AuthRoute";
// 懒加载布局组件
const Layout = React.lazy(() => import("@/Layout/index"));
// 懒加载页面组件
const Login = React.lazy(() => import("@/pages/Login/index"));
const Home = React.lazy(() => import("@/pages/Home/index"));
const Mine = React.lazy(() => import("@/pages/Mine/index"));
const UserManager = React.lazy(() => import("@/pages/UserManager/index"));
const BabyManager = React.lazy(() => import("@/pages/BabyManager/index"));
const AddBaby = React.lazy(() => import("@/pages/AddBaby/index"));
const NotFound = React.lazy(() => import("@/pages/NotFound/index"));

export const router = createHashRouter([
  // 首页
  {
    path: "/",
    element: React.createElement(AuthRoute),
    children: [
      // 访问 / 时重定向到 /home
      {
        path: "",
        element: React.createElement(Navigate, { to: "/home", replace: true }),
      },
      {
        element: React.createElement(Layout),
        children: [
          { path: "home", element: React.createElement(Home) },
          { path: "mine", element: React.createElement(Mine) },
          { path: "user-manager", element: React.createElement(UserManager) },
          { path: "baby-manager", element: React.createElement(BabyManager) },
          { path: "add-baby", element: React.createElement(AddBaby) },
        ],
      },
    ],
  },
  // 登录页
  {
    path: "login",
    element: React.createElement(Login),
  },
  // 404 页面
  {
    path: "*",
    element: React.createElement(NotFound),
  },
]);
