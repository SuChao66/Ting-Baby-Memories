import { useNavigate } from "react-router-dom";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";

interface NavBarProps {
  title: string;
  right?: React.ReactNode;
}

function NavHeader(props: NavBarProps) {
  const { title, right } = props;

  const navigate = useNavigate();

  // 返回上一页
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <NavBar
      title={title}
      back={<IoIosArrowBack size={22} />}
      right={right}
      onBackClick={handleBack}
    />
  );
}

export default NavHeader;
