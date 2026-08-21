// 导入组件
import NavHeader from "@/components/navHeader";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
// 导入样式
import { DailyRecordContainer } from "./styles";

function DailyRecord() {
  return (
    <>
      <NavHeader title="吃喝拉撒睡" back={<IoIosArrowBack size={22} />} />
      <DailyRecordContainer>吃喝拉撒睡</DailyRecordContainer>
    </>
  );
}

export default DailyRecord;
