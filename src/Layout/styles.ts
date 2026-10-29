// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入类型
import type { TimelineViewType } from "@/types";
// 导入常量
import { TIME_LIME_VIEW_MODE } from "@/enums";

/** 布局容器 */
export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  /* NutUI Tabbar 圆角阴影样式覆盖 */
  .nut-tabbar {
    background: #fff;
    border-radius: ${vw(8)} ${vw(8)} 0 0;
    box-shadow: 0 ${vw(-4)} ${vw(16)} rgba(0, 0, 0, 0.06);
    padding: ${vw(8)} ${vw(8)} calc(${vw(8)} + env(safe-area-inset-bottom));
    box-sizing: border-box;
  }
`;

/** 内容区域 */
export const Content = styled.main<{
  mode: TimelineViewType;
}>`
  flex: 1;
  overflow: hidden;
  padding: ${(props) => (props.mode === TIME_LIME_VIEW_MODE.LIST ? vw(16) : 0)};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

/** TabBar 中间 AI 助手凸起按钮（占位与普通图标一致，视觉上浮凸出 TabBar 上边缘） */
export const TabAiIconWrap = styled.span<{ $active: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${vw(24)};
  height: ${vw(24)};
  /* 整体上移形成凸起；transform 不占布局，中间 title 与两侧保持同线 */
  transform: translateY(${vw(-16)});
  transition: transform 0.2s;

  /* 凸起大圆底 */
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: ${vw(50)};
    height: ${vw(50)};
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
    border: ${vw(4)} solid #fff;
    box-sizing: border-box;
    box-shadow: 0 ${vw(6)} ${vw(16)} rgba(255, 107, 138, 0.45);
    transition: box-shadow 0.2s;
  }

  /* 图标置于圆底之上 */
  > svg {
    position: relative;
    z-index: 1;
  }

  ${(props) =>
    props.$active
      ? `
    transform: translateY(${vw(-16)}) scale(1.06);

    &::before {
      box-shadow: 0 ${vw(8)} ${vw(20)} rgba(255, 107, 138, 0.55);
    }
  `
      : ""}
`;
