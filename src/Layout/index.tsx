import { useEffect, useState } from "react";
// 导入 NutUI 图标
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { FaAirbnb } from "react-icons/fa";
// 导入路由相关方法
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// 导入布局样式组件
import { LayoutContainer, Content, TabAiIconWrap } from "./styles";
// 导入用户 store
import { useUserStore, useTimelineStore } from "@/store";
// 导入工具函数
import { initRouter } from "@/utils";
// 导入进度条hooks
import { useNProgress } from "@/hooks";
// 导入常量
import { TIME_LIME_VIEW_MODE } from "@/enums";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 底部导航栏配置 */
const tabs = [
  { path: "/home", title: "汀宝宝" },
  { path: "/ai", title: "AI 助手" },
  { path: "/mine", title: "我的" },
];

export default function Layout() {
  const { userInfo, getUserInfo } = useUserStore((state) => state);
  const { viewMode, setViewMode } = useTimelineStore((state) => state);

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
      setActiveIndex(2);
    } else if (location.pathname === "/ai") {
      setActiveIndex(1);
    } else if (location.pathname === "/home") {
      setActiveIndex(0);
    } else {
      setActiveIndex(-1);
    }
    if (location.pathname.includes("exhibition-hall")) {
      setViewMode(TIME_LIME_VIEW_MODE.THREE_D);
    } else {
      setViewMode(TIME_LIME_VIEW_MODE.LIST);
    }

    // 路由切换后复位 iOS WebView 因键盘等操作残留的页面位移（延迟等待布局恢复）
    const resetTimer = window.setTimeout(() => {
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    }, 300);
    return () => window.clearTimeout(resetTimer);
  }, [location.pathname]);

  useEffect(() => {
    // 仅在 userInfo 不存在时获取，存在则跳过
    if (!userInfo?._id) {
      getUserInfo();
    }
  }, [getUserInfo, userInfo?._id]);

  // 启用进度条hooks
  useNProgress();

  return (
    <LayoutContainer>
      <Content mode={viewMode}>
        <Outlet />
      </Content>
      {(location.pathname === "/mine" ||
        location.pathname === "/home" ||
        location.pathname === "/ai") && (
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
            icon={() => (
              <TabAiIconWrap $active={activeIndex === 1}>
                <FaAirbnb color="#fff" size={vw(22)} />
              </TabAiIconWrap>
            )}
          />
          <Tabbar.Item
            title={tabs[2].title}
            icon={(active: boolean) => (
              <AiOutlineUser color={active ? "#ff6b8a" : "#7d7e80"} />
            )}
          />
        </Tabbar>
      )}
    </LayoutContainer>
  );
}
