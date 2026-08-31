import { useNavigate } from "react-router-dom";

// 自定义导航钩子
export const useRouter = () => {
  const navigate = useNavigate();

  const goToLogin = () => navigate("/login");

  return {
    goToLogin,
  };
};
