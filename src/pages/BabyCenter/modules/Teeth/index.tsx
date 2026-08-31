// 导入组件
import NavHeader from "@/components/navHeader";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
// 导入样式
import { TeethContainer } from "./styles";

function Teeth() {
  return (
    <>
      <NavHeader title="长牙换牙" back={<IoIosArrowBack size={22} />} />
      <TeethContainer>长牙换牙</TeethContainer>
    </>
  );
}

export default Teeth;
