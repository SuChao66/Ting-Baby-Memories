import { useNavigate } from "react-router-dom";

interface NavBarProps {
  title: string;
  back?: React.ReactNode;
  right?: React.ReactNode;
}

function NavHeader(props: NavBarProps) {
  const { title, right, back } = props;

  const navigate = useNavigate();

  // 返回上一页
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <NavBar title={title} back={back} right={right} onBackClick={handleBack} />
  );
}

export default NavHeader;
