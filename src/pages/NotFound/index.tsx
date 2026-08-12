// 导入路由方法
import { useNavigate } from "react-router-dom";
// 导入404页面样式组件
import { NotFoundContainer, TitleContainer } from "./styles";
// 导入图片
import NotFoundImg from "@/assets/images/404.png";

export default function NotFound() {
  const navigate = useNavigate();

  // 跳转至首页
  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <NotFoundContainer>
      <img src={NotFoundImg} alt="404" />
      <TitleContainer>阿喔，页面丢失了～</TitleContainer>
      <Button type="primary" onClick={handleBackHome}>
        返回首页
      </Button>
    </NotFoundContainer>
  );
}
