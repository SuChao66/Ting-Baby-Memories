// 导入组件
import NavHeader from "@/components/navHeader";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
// 导入样式
import { MileStoneContainer } from "./styles";

function MileStone() {
  return (
    <>
      <NavHeader title="大事记" back={<IoIosArrowBack size={22} />} />
      <MileStoneContainer>大事记</MileStoneContainer>
    </>
  );
}

export default MileStone;
