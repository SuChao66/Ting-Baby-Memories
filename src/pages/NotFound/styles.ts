// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 404 容器 */
export const NotFoundContainer = styled.div`
  text-align: center;
  padding-top: ${vw(80)};
`;

/** 404 标题 */
export const NotFoundTitle = styled.h1`
  font-size: ${vw(48)};
`;
