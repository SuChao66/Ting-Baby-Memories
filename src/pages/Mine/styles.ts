// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 我的页面容器 */
export const MineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(16)};
`;
