// 导入组件
import NavHeader from "@/components/navHeader";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
// 导入样式
import { SymptomContainer } from "./styles";

function Symptom() {
  return (
    <>
      <NavHeader title="症状护理" back={<IoIosArrowBack size={22} />} />
      <SymptomContainer>症状护理</SymptomContainer>
    </>
  );
}

export default Symptom;
