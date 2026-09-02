// 导入 styled-components
import { createGlobalStyle } from "styled-components";
// 导入主题类型
import type { Theme } from "./theme";
// 导入 vw 函数
import { vw } from "@/utils";

/** 全局样式 */
export const GlobalStyle = createGlobalStyle<{ theme?: Theme }>`
  * {
    box-sizing: border-box;
    /* 移除移动端点击元素时的默认蓝色高亮 */
    -webkit-tap-highlight-color: transparent;
  }

  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
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

  .nut-navbar {
    background-color: transparent;
    padding: 0;
  }

  .nut-navbar-title {
    font-size: ${vw(14)};
    font-weight: 600;
  }

  /* 修改进度条的主体颜色 */
  #nprogress .bar {
    background: ${({ theme }) => theme.colors.primaryColor} !important; /* 替换为你想要的颜色，例如主题色 */
  }

  /* 修改进度条右侧的光晕效果（保持和主体颜色一致，否则会有色差） */
  #nprogress .peg {
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.primaryColor}, 0 0 5px ${({ theme }) => theme.colors.primaryColor} !important;
  }
`;
