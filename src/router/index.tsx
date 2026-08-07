// 导入路由方法
import { createHashRouter } from "react-router-dom";
import React from "react";
/* eslint-disable react-refresh/only-export-components */

// 懒加载布局组件
const Layout = React.lazy(() => import("@/Layout"));
// 懒加载页面组件
const Home = React.lazy(() => import("@/pages/Home"));
const Albums = React.lazy(() => import("@/pages/Albums"));
const Timeline = React.lazy(() => import("@/pages/Timeline"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));

export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "albums", element: <Albums /> },
      { path: "timeline", element: <Timeline /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
