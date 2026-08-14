// 导入 styled-components
import { createGlobalStyle } from "styled-components";
// 导入主题类型
import type { Theme } from "./theme";

/** 全局样式 */
export const GlobalStyle = createGlobalStyle<{ theme?: Theme }>`
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Noto Sans SC", sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  a {
    color: ${({ theme }) => theme.colors.primaryColor};
    text-decoration: none;
  }

  // 自定义 toast 样式
  .nut-toast-inner {
    gap: 12px;
  }
`;
