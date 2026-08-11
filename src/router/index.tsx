// 导入路由方法
import { createHashRouter } from "react-router-dom";
import React from "react";
/* eslint-disable react-refresh/only-export-components */

// 懒加载布局组件
const Layout = React.lazy(() => import("@/Layout/index"));
// 懒加载页面组件
const Home = React.lazy(() => import("@/pages/Home/index"));
const Mine = React.lazy(() => import("@/pages/Mine/index"));
const NotFound = React.lazy(() => import("@/pages/NotFound/index"));

export const router = createHashRouter([
  {
    path: "/",
    element: React.createElement(Layout),
    children: [
      { index: true, element: React.createElement(Home) },
      { path: "mine", element: React.createElement(Mine) },
      { path: "*", element: React.createElement(NotFound) },
    ],
  },
]);
