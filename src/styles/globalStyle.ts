// 导入 styled-components
import { createGlobalStyle } from "styled-components";
// 导入主题类型
import type { Theme } from "./theme";

/** 全局样式 */
export const GlobalStyle = createGlobalStyle<{ theme?: Theme }>`
  * {
    box-sizing: border-box;
  }

  a {
    color: ${({ theme }) => theme.colors.primaryColor};
    text-decoration: none;
  }
`;
