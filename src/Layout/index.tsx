import { useEffect, useState } from "react";
// 导入 NutUI 图标
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
// 导入路由相关方法
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// 导入布局样式组件
import { LayoutContainer, Content } from "./styles";
// 导入用户 store
import { useUserStore } from "@/store";
// 导入工具函数
import { initRouter } from "@/utils";

/** 底部导航栏配置 */
const tabs = [
  { path: "/home", title: "汀宝宝" },
  { path: "/mine", title: "我的" },
];

export default function Layout() {
  const { userInfo, getUserInfo } = useUserStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  // 组件挂载时，把真实的 navigate 注入到全局工具中
  useEffect(() => {
    initRouter(navigate);
  }, [navigate]);

  // 监听路由变化，更新 activeIndex
  useEffect(() => {
    if (location.pathname === "/mine") {
      setActiveIndex(1);
    } else if (location.pathname === "/home") {
      setActiveIndex(0);
    } else {
      setActiveIndex(-1);
    }
  }, [location.pathname]);

  useEffect(() => {
    // 仅在 userInfo 不存在时获取，存在则跳过
    if (!userInfo?._id) {
      getUserInfo();
    }
  }, [getUserInfo, userInfo?._id]);

  return (
    <LayoutContainer>
      <Content>
        <Outlet />
      </Content>
      {(location.pathname === "/mine" || location.pathname === "/home") && (
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
              <AiOutlineHome color={active ? "#ff6b8a" : "#7d7e80"} />
            )}
          />
          <Tabbar.Item
            title={tabs[1].title}
            icon={(active: boolean) => (
              <AiOutlineUser color={active ? "#ff6b8a" : "#7d7e80"} />
            )}
          />
        </Tabbar>
      )}
    </LayoutContainer>
  );
}
