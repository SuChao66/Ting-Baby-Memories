import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
import svgr from "vite-plugin-svgr";
// 引入 NutUI 组件列表
import { nutuiComponents } from "./nutui-components.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: [
        {
          "@nutui/nutui-react": nutuiComponents,
        },
        {
          "@/baseUI/svgIcon/index.tsx": [["default", "SvgIcon"]],
        },
      ],
      dts: "src/auto-imports.d.ts",
    }),
    svgr({
      svgrOptions: {
        icon: true, // 自动转换为 1em 基准尺寸
        replaceAttrValues: { currentColor: "{props.color}" }, // 支持颜色动态传递
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
