// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

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
    padding: ${vw(8)};
    box-sizing: border-box;
  }
`;

/** 内容区域 */
export const Content = styled.main`
  flex: 1;
  overflow: hidden;
  padding: ${vw(16)} ${vw(16)};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
