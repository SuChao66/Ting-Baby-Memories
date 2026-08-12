import pxToViewport from "postcss-px-to-viewport-8-plugin";

export default {
  plugins: [
    pxToViewport({
      viewportWidth: 375,
      unitPrecision: 5,
      viewportUnit: "vw",
      selectorBlackList: [".nut-"], // 忽略 NutUI 组件
      minPixelValue: 1,
      mediaQuery: false,
    }),
  ],
};
