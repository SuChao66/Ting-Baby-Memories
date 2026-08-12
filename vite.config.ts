import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
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
      ],
      dts: "src/auto-imports.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
