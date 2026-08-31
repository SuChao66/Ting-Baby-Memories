// 导入组件
import NavHeader from "@/components/navHeader";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
// 导入样式
import { FutureMessageContainer } from "./styles";

function FutureMessage() {
  return (
    <>
      <NavHeader title="未来寄语" back={<IoIosArrowBack size={22} />} />
      <FutureMessageContainer>未来寄语</FutureMessageContainer>
    </>
  );
}

export default FutureMessage;
