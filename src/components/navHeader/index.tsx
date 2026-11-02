import { useNavigate } from "react-router-dom";

interface NavBarProps {
  title: React.ReactNode;
  back?: React.ReactNode;
  right?: React.ReactNode;
  isBack?: boolean;
}

function NavHeader(props: NavBarProps) {
  const { title, right, back, isBack = true } = props;

  const navigate = useNavigate();

  // 返回上一页
  const handleBack = () => {
    if (!isBack) return;
    navigate(-1);
  };

  return (
    <NavBar
      title={title}
      back={back}
      right={right}
      onBackClick={handleBack}
      safeAreaInsetTop
    />
  );
}

export default NavHeader;
