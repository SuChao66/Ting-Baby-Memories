// 导入组件
import NavHeader from "@/components/navHeader";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
// 导入样式
import { VaccineContainer } from "./styles";
// 导入组件
import Empty from "@/baseUI/empty";

function Vaccine() {
  return (
    <>
      <NavHeader title="疫苗接种" back={<IoIosArrowBack size={22} />} />
      <VaccineContainer>
        <Empty text="敬请期待" />
      </VaccineContainer>
    </>
  );
}

export default Vaccine;
