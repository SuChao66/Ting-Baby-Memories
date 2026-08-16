/** 主题配置 */
export const theme = {
  colors: {
    bg: "#fff",
    pageBg: "#fff0f3",
    text: "#2d2d2d",
    textH: "#08060d",
    textSecondary: "#646566",
    border: "#fff0f3",
    primaryColor: "#236eff",
    primaryColorLight: "#236eff1a",
  },
} as const;

export type Theme = typeof theme;
