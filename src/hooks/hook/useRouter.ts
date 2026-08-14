import { useNavigate } from "react-router-dom";

// 自定义导航钩子
export const useRouter = (path: string) => {
  const navigate = useNavigate();
  navigate(path);
};
