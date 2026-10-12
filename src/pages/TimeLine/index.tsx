import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { IoPlanet, IoList } from "react-icons/io5";
// 导入组件
import NavHeader from "@/components/navHeader";
import UnlockFutureMessage from "./components/UnlockFutureMessage";
import TimeCapsule3D from "./components/TimeCapsule3D";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入组件
import BabyInfo from "./components/BabyInfo";
import TimeLineList from "./components/TimeLineList";
// 导入样式
import { TimeLineContainer, FloatButton, ViewToggleBtn } from "./styles";
// 导入store
import {
  useBabyStore,
  useFamilyStore,
  useFutureMessageStore,
  useTimelineStore,
} from "@/store";
// 导入常量
import { TIME_LIME_VIEW_MODE } from "@/enums";

function TimeLine() {
  const { id } = useParams();
  const { setBabyId } = useBabyStore((state) => state);
  const { recordVisit } = useFamilyStore((state) => state);
  const getUnlockCount = useFutureMessageStore((state) => state.getUnlockCount);
  // 视图模式：列表 / 3D 胶囊
  const { viewMode, setViewMode } = useTimelineStore((state) => state);

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

  // 切换视图模式（列表 / 3D 胶囊）
  const handleToggleViewMode = () => {
    setViewMode(
      viewMode === TIME_LIME_VIEW_MODE.LIST
        ? TIME_LIME_VIEW_MODE.THREE_D
        : TIME_LIME_VIEW_MODE.LIST,
    );
  };

  return (
    <>
      <NavHeader
        title={viewMode === TIME_LIME_VIEW_MODE.LIST ? "成长轨迹" : ""}
        back={
          viewMode === TIME_LIME_VIEW_MODE.LIST ? (
            <IoIosArrowBack size={22} />
          ) : null
        }
        right={
          <ViewToggleBtn mode={viewMode} onClick={handleToggleViewMode}>
            {viewMode === TIME_LIME_VIEW_MODE.LIST ? (
              <>
                <IoPlanet size={vw(16)} />
                3D
              </>
            ) : (
              <>
                <IoList size={vw(16)} />
              </>
            )}
          </ViewToggleBtn>
        }
      />
      {viewMode === TIME_LIME_VIEW_MODE.THREE_D ? (
        <TimeCapsule3D babyId={id!} />
      ) : (
        <>
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
      )}
    </>
  );
}

export default TimeLine;
