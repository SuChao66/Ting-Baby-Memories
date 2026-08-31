import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
// 导入组件
import NavHeader from "@/components/navHeader";
// 导入 vw 工具函数
import { vw } from "@/utils";
import BabyInfo from "./components/BabyInfo";
import TimeLineList from "./components/TimeLineList";
// 导入样式
import { TimeLineContainer, FloatButton } from "./styles";
// 导入store
import { useBabyStore } from "@/store";

function TimeLine() {
  const { id } = useParams();
  const { setBabyId } = useBabyStore((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    setBabyId(id!);
  }, []);

  // 进入发布记录页面
  const handleAddTimeLine = () => {
    navigate("/add-timeline");
  };

  return (
    <>
      <NavHeader title="成长轨迹" back={<IoIosArrowBack size={22} />} />
      <TimeLineContainer>
        {/* 宝宝信息横幅 */}
        <BabyInfo id={id!} />

        {/* 时间线 */}
        <TimeLineList id={id!} />

        {/* 悬浮发布按钮 */}
        <FloatButton onClick={handleAddTimeLine}>
          <AiOutlinePlus color="#fff" size={vw(24)} />
        </FloatButton>
      </TimeLineContainer>
    </>
  );
}

export default TimeLine;
