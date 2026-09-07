import { EmptyContainer, FutureMessageTip, BtnWraper } from "./styles";
// 导入图片
import futureMessageIcon from "@/assets/images/future-message-icon.png";

function Empty() {
  return (
    <EmptyContainer>
      <img src={futureMessageIcon} alt="" />
      <FutureMessageTip>宝宝的时光信箱，等待投递</FutureMessageTip>
      <FutureMessageTip>
        轻触右上角的<BtnWraper>写寄语</BtnWraper>开始记录吧
      </FutureMessageTip>
    </EmptyContainer>
  );
}

export default Empty;
