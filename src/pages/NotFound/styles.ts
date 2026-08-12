// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 404 容器 */
export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

/** 404 标题容器 */
export const TitleContainer = styled.div`
  font-size: ${vw(14)};
  margin: ${vw(12)};
`;
