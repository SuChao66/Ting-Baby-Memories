/** 主题配置 */
export const theme = {
  colors: {
    bg: "#fff",
    pageBg: "#f7f8fa",
    text: "#323233",
    textH: "#08060d",
    textSecondary: "#646566",
    border: "#ebedf0",
    primaryColor: "#236eff",
    primaryColorLight: "#236eff1a",
  },
} as const;

export type Theme = typeof theme;
