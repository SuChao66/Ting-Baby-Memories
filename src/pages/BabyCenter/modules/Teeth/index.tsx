// 导入组件
import NavHeader from "@/components/navHeader";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
// 导入样式
import { TeethContainer } from "./styles";
// 导入组件
import Empty from "@/baseUI/empty";

function Teeth() {
  return (
    <>
      <NavHeader title="长牙换牙" back={<IoIosArrowBack size={22} />} />
      <TeethContainer>
        <Empty text="敬请期待" />
      </TeethContainer>
    </>
  );
}

export default Teeth;
