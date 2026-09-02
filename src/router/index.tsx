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
const TimeLine = React.lazy(() => import("@/pages/TimeLine/index"));
const AddTimeLine = React.lazy(
  () => import("@/pages/TimeLine/modules/AddTimeline/index"),
);
const TagManager = React.lazy(
  () => import("@/pages/TimeLine/modules/TagManager/index"),
);
const BabyCenter = React.lazy(() => import("@/pages/BabyCenter/index"));
const CloudAlbum = React.lazy(
  () => import("@/pages/BabyCenter/modules/CloudAlbum/index"),
);
const MileStone = React.lazy(
  () => import("@/pages/BabyCenter/modules/MileStone/index"),
);
const DailyRecord = React.lazy(
  () => import("@/pages/BabyCenter/modules/DailyRecord/index"),
);
const HeightWeight = React.lazy(
  () => import("@/pages/BabyCenter/modules/HeightWeight/index"),
);
const Vaccine = React.lazy(
  () => import("@/pages/BabyCenter/modules/Vaccine/index"),
);
const Symptom = React.lazy(
  () => import("@/pages/BabyCenter/modules/Symptom/index"),
);
const Teeth = React.lazy(
  () => import("@/pages/BabyCenter/modules/Teeth/index"),
);
const FutureMessage = React.lazy(
  () => import("@/pages/BabyCenter/modules/FutureMessage/index"),
);
const UserManager = React.lazy(
  () => import("@/pages/Mine/modules/UserManager/index"),
);
const BabyManager = React.lazy(
  () => import("@/pages/Mine/modules/BabyManager/index"),
);
const AddBaby = React.lazy(
  () => import("@/pages/Mine/modules/BabyManager/modules/AddBaby/index"),
);
const BindBaby = React.lazy(
  () => import("@/pages/Mine/modules/BabyManager/modules/BindBaby/index"),
);
const BabyFile = React.lazy(
  () => import("@/pages/Mine/modules/BabyManager/modules/BabyFile/index"),
);
const ChangePassword = React.lazy(
  () => import("@/pages/Mine/modules/ChangePassword/index"),
);
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
          { path: "timeline/:id", element: React.createElement(TimeLine) },
          { path: "add-timeline", element: React.createElement(AddTimeLine) },
          { path: "edit-timeline", element: React.createElement(AddTimeLine) },
          { path: "tag", element: React.createElement(TagManager) },
          { path: "baby-center/:id", element: React.createElement(BabyCenter) },
          { path: "cloud-album/:id", element: React.createElement(CloudAlbum) },
          { path: "mile-stone/:id", element: React.createElement(MileStone) },
          {
            path: "daily-record/:id",
            element: React.createElement(DailyRecord),
          },
          {
            path: "height-weight/:id",
            element: React.createElement(HeightWeight),
          },
          { path: "vaccine/:id", element: React.createElement(Vaccine) },
          { path: "symptom/:id", element: React.createElement(Symptom) },
          { path: "teeth/:id", element: React.createElement(Teeth) },
          {
            path: "future-message/:id",
            element: React.createElement(FutureMessage),
          },
          { path: "user-manager", element: React.createElement(UserManager) },
          { path: "baby-manager", element: React.createElement(BabyManager) },
          { path: "add-baby", element: React.createElement(AddBaby) },
          { path: "bind-baby", element: React.createElement(BindBaby) },
          { path: "baby-file/:id", element: React.createElement(BabyFile) },
          {
            path: "change-password",
            element: React.createElement(ChangePassword),
          },
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
