// 导入样式组件
import { Mask, Panel, RingWrap, RingSvg, RingBg, RingFg, PercentText, TitleText } from "./styles";

/** 圆环半径（viewBox 120） */
const RADIUS = 54;
/** 圆环周长 */
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface IProps {
  visible: boolean;
  /** 总进度 0-100 */
  percent: number;
  /** 提示文案，如"上传中 3/9" */
  title: string;
}

/** 自定义上传进度弹框：遮罩 + 圆环进度 */
function UploadProgress(props: IProps) {
  const { visible, percent, title } = props;
  if (!visible) return null;

  const clamped = Math.min(100, Math.max(0, Math.round(percent)));
  const offset = CIRCUMFERENCE * (1 - clamped / 100);

  return (
    <Mask>
      <Panel>
        <RingWrap>
          <RingSvg viewBox="0 0 120 120">
            <RingBg cx="60" cy="60" r={RADIUS} />
            <RingFg
              cx="60"
              cy="60"
              r={RADIUS}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </RingSvg>
          <PercentText>{clamped}%</PercentText>
        </RingWrap>
        <TitleText>{title}</TitleText>
      </Panel>
    </Mask>
  );
}

export default UploadProgress;
