import {
  ProgressHeaderWrap,
  InfoRow,
  AgeBadge,
  StatsText,
  StatNum,
  ProgressTrack,
  ProgressFill,
  ProgressDesc,
} from "./styles";

interface IProps {
  /** 宝宝月龄文案，如 "7个月" */
  ageText: string;
  /** 已种剂次数 */
  doneCount: number;
  /** 应种剂次数（推荐月龄已到达） */
  dueCount: number;
}

/** 顶部进度概览：宝宝月龄 + 已种/应种 + 进度条 */
function ProgressHeader({ ageText, doneCount, dueCount }: IProps) {
  const percent =
    dueCount > 0
      ? Math.min(100, Math.round((doneCount / dueCount) * 100))
      : 100;

  return (
    <ProgressHeaderWrap>
      <InfoRow>
        <AgeBadge>{ageText}</AgeBadge>
        <StatsText>
          已种 <StatNum>{doneCount}</StatNum> 剂 / 应种 {dueCount} 剂
        </StatsText>
      </InfoRow>
      <ProgressTrack>
        <ProgressFill $percent={percent} />
      </ProgressTrack>
      <ProgressDesc>按时接种疫苗，为宝宝筑起免疫防线</ProgressDesc>
    </ProgressHeaderWrap>
  );
}

export default ProgressHeader;
