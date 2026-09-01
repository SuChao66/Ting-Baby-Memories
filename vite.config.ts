import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
import svgr from "vite-plugin-svgr";
// 引入 NutUI 组件列表
import { nutuiComponents } from "./nutui-components.js";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
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
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "汀宝宝记忆",
        short_name: "汀宝宝",
        description: "汀宝宝记忆，一个留存记忆的地方",
        theme_color: "#fff0f3",
        icons: [
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        display: "standalone",
      },
      // 开发环境也启用 PWA 方便调试
      devOptions: {
        enabled: false,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
