import { StrictMode, Suspense } from "react";
// 引入 React DOM 客户端模块的 createRoot 函数
import { createRoot } from "react-dom/client";
// 引入 styled-components 的 ThemeProvider 组件
import { ThemeProvider } from "styled-components";
// 引入 NutUI 的样式
import "@nutui/nutui-react/dist/style.css";
// 引入全局样式
import "./index.css";
// 引入主题配置
import { theme } from "./styles/theme";
// 引入全局样式组件
import { GlobalStyle } from "./styles/globalStyle";
// 引入应用组件
import App from "./App.tsx";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle /> {/* 全局样式 */}
      <Suspense fallback={<div>加载中...</div>}>
        <App /> {/* 应用组件 */}
      </Suspense>
    </ThemeProvider>
  </StrictMode>,
);
