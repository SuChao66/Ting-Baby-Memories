// 导入 NutUI 组件
import { Button } from "@nutui/nutui-react";
// 导入路由方法
import { useNavigate } from "react-router-dom";
// 导入404页面样式组件
import { NotFoundContainer, NotFoundTitle } from "./styles";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <p>页面不存在</p>
      <Button type="primary" onClick={() => navigate("/")}>
        返回首页
      </Button>
    </NotFoundContainer>
  );
}
