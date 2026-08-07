// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 布局容器 */
export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

/** 内容区域 */
export const Content = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: ${vw(16)} ${vw(16)} ${vw(60)};
`;
