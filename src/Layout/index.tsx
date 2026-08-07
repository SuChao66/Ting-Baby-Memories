// 导入 NutUI 组件
import { Tabbar } from "@nutui/nutui-react";
// 导入路由相关方法
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// 导入布局样式组件
import { LayoutContainer, Content } from "./styles";

/** 底部导航栏配置 */
const tabs: { path: string; title: string }[] = [
  { path: "/", title: "首页" },
  { path: "/albums", title: "相册" },
  { path: "/timeline", title: "时间线" },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.path === location.pathname),
  );

  return (
    <LayoutContainer>
      <Content>
        <Outlet />
      </Content>
      <Tabbar
        value={activeIndex}
        onSwitch={(index: number) => navigate(tabs[index].path)}
      >
        {tabs.map((tab) => (
          <Tabbar.Item key={tab.path} title={tab.title} />
        ))}
      </Tabbar>
    </LayoutContainer>
  );
}
