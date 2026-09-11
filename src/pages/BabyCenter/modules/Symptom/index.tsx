// 导入组件
import NavHeader from "@/components/navHeader";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
// 导入样式
import { SymptomContainer } from "./styles";
// 导入组件
import Empty from "@/baseUI/empty";

function Symptom() {
  return (
    <>
      <NavHeader title="症状护理" back={<IoIosArrowBack size={22} />} />
      <SymptomContainer>
        <Empty text="敬请期待" />
      </SymptomContainer>
    </>
  );
}

export default Symptom;
