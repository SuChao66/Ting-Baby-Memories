// 导入组件
import SvgIcon from "@/baseUI/svgIcon";
// 导入样式
import { EmptyContainer, Tip, GuideTip, BtnWraper } from "./styles";

interface IProps {
  /** 主提示文案 */
  tip?: string;
  /** 是否展示"添加"引导文案 */
  guide?: boolean;
}

function Empty(props: IProps) {
  const { tip = "宝宝的身高体重，等待记录", guide = true } = props;

  return (
    <EmptyContainer>
      <SvgIcon name="empty" size={128} />
      <Tip>{tip}</Tip>
      {/* 引导添加文案仅记录列表页签空态展示 */}
      {guide && (
        <GuideTip>
          轻触右上角的<BtnWraper>添加</BtnWraper>开始记录吧
        </GuideTip>
      )}
    </EmptyContainer>
  );
}

export default Empty;
