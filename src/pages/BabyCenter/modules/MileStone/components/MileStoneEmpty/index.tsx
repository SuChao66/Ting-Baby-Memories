import { MileStoneEmpty, TipText, TipTag } from "./styles";
// 导入图片
import MileStoneImg from "@/assets/images/mileStore-bg.png";

function Empty() {
  return (
    <>
      {/* 空状态引导插画 */}
      <MileStoneEmpty>
        <img src={MileStoneImg} alt="大事记" />
      </MileStoneEmpty>
      {/* 底部引导提示 */}
      <TipText>
        轻触右上角的“<TipTag>添加</TipTag>”开始记录吧
      </TipText>
    </>
  );
}

export default Empty;
