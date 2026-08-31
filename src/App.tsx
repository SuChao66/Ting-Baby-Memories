// 导入路由提供者
import { RouterProvider } from "react-router-dom";
// 导入路由配置
import { router } from "./router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
