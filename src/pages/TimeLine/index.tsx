import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
// 导入组件
import NavHeader from "@/components/navHeader";
import UnlockFutureMessage from "./components/UnlockFutureMessage";
// 导入 vw 工具函数
import { vw } from "@/utils";
import BabyInfo from "./components/BabyInfo";
import TimeLineList from "./components/TimeLineList";
// 导入样式
import { TimeLineContainer, FloatButton } from "./styles";
// 导入store
import { useBabyStore, useFamilyStore, useFutureMessageStore } from "@/store";

function TimeLine() {
  const { id } = useParams();
  const { setBabyId } = useBabyStore((state) => state);
  const { recordVisit } = useFamilyStore((state) => state);
  const getUnlockCount = useFutureMessageStore((state) => state.getUnlockCount);

  const navigate = useNavigate();

  // 当前有几条未读解锁的未来信件
  const [unlockCount, setUnlockCount] = useState(0);
  // 是否查看已解锁信件
  const [isViewUnlockMessage, setIsViewUnlockMessage] = useState(false);

  useEffect(() => {
    setBabyId(id!);
    // 记录访问次数（埋点）
    recordVisit(id!);
    // 获取已解锁的未来寄语数量
    getUnlockCounts();
  }, [id]);

  // 获取已解锁的未来寄语数量
  const getUnlockCounts = async () => {
    const count = await getUnlockCount({ babyId: id! });
    setUnlockCount(count);
  };

  // 进入发布记录页面
  const handleAddTimeLine = () => {
    navigate("/add-timeline");
  };

  // 关闭弹框
  const handleClose = () => {
    setIsViewUnlockMessage(false);
    // 关闭弹框后，刷新已解锁的未来寄语数量
    getUnlockCounts();
  };

  return (
    <>
      <NavHeader title="成长轨迹" back={<IoIosArrowBack size={22} />} />
      {unlockCount > 0 && (
        <ConfigProvider
          theme={{
            nutuiNoticebarBackground: "transparent",
            nutuiNoticebarColor: "#ff6b8a",
          }}
        >
          <NoticeBar
            content={`您有 ${unlockCount} 条未读的未来信件,请及时查收～`}
            align="center"
            scrollable={true}
            onClick={() => setIsViewUnlockMessage(true)}
          />
        </ConfigProvider>
      )}
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
      {/* 查看已解锁信件弹层 */}
      {isViewUnlockMessage && (
        <UnlockFutureMessage babyId={id!} onClose={handleClose} />
      )}
    </>
  );
}

export default TimeLine;
