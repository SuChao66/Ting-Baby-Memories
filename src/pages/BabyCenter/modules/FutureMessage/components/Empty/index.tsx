import { EmptyContainer, FutureMessageTip, BtnWraper } from "./styles";
// 导入图片
import futureMessageIcon from "@/assets/images/future-message-icon.png";

interface IProps {
  /** 主提示文案（已解锁页签空态文案不同） */
  tip?: string;
  /** 是否展示"写寄语"引导文案 */
  guide?: boolean;
}

function Empty(props: IProps) {
  const { tip = "宝宝的时光信箱，等待投递", guide = true } = props;

  return (
    <EmptyContainer>
      <img src={futureMessageIcon} alt="" />
      <FutureMessageTip>{tip}</FutureMessageTip>
      {/* 引导写寄语文案仅待开启页签空态展示 */}
      {guide && (
        <FutureMessageTip>
          轻触右上角的<BtnWraper>写寄语</BtnWraper>开始记录吧
        </FutureMessageTip>
      )}
    </EmptyContainer>
  );
}

export default Empty;
