// 导入组件
import NavHeader from "@/components/navHeader";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
// 导入样式
import { HeightWeightContainer } from "./styles";

function HeightWeight() {
  return (
    <>
      <NavHeader title="身高体重" back={<IoIosArrowBack size={22} />} />
      <HeightWeightContainer>身高体重</HeightWeightContainer>
    </>
  );
}

export default HeightWeight;
