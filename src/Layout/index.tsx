// 导入 NutUI 组件
import { Tabbar } from "@nutui/nutui-react";
// 导入 NutUI 图标
import { Home, User } from "@nutui/icons-react";
// 导入路由相关方法
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// 导入布局样式组件
import { LayoutContainer, Content } from "./styles";

/** 底部导航栏配置 */
const tabs = [
  { path: "/", title: "首页" },
  { path: "/mine", title: "我的" },
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
        activeColor="#ff6b8a"
        inactiveColor="#7d7e80"
        safeArea
      >
        <Tabbar.Item
          title={tabs[0].title}
          icon={(active: boolean) => (
            <Home color={active ? "#ff6b8a" : "#7d7e80"} />
          )}
        />
        <Tabbar.Item
          title={tabs[1].title}
          icon={(active: boolean) => (
            <User color={active ? "#ff6b8a" : "#7d7e80"} />
          )}
        />
      </Tabbar>
    </LayoutContainer>
  );
}
