// 导入路由提供者
import { RouterProvider } from "react-router-dom";
// 导入路由配置
import { router } from "./router";
// 导入 hooks
import { useViewportGuard } from "./hooks";

function App() {
  // iOS WebView 视口守卫：防止键盘等原因导致的页面位移残留
  useViewportGuard();

  return <RouterProvider router={router} />;
}

export default App;
