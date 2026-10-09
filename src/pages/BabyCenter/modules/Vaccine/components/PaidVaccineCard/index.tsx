import type { IPaidVaccineSummary } from "../../types";
import {
  PaidCardWrap,
  CardHead,
  VaccineName,
  SwitchWrap,
  CardIntro,
  CardMeta,
  MetaText,
  DoneText,
  RegisterBtn,
} from "./styles";

interface IProps {
  /** 自费疫苗汇总信息 */
  summary: IPaidVaccineSummary;
  /** 是否已加入接种计划 */
  planned: boolean;
  /** 已接种剂次数 */
  doneCount: number;
  /** 加入/移出计划 */
  onTogglePlan: () => void;
  /** 登记接种 */
  onRegister: () => void;
}

/** 自费疫苗卡片：疫苗库条目 + 加入计划开关 + 登记入口 */
function PaidVaccineCard({
  summary,
  planned,
  doneCount,
  onTogglePlan,
  onRegister,
}: IProps) {
  const allDone = doneCount >= summary.totalDose;

  return (
    <PaidCardWrap>
      <CardHead>
        <VaccineName>{summary.vaccineName}</VaccineName>
        <SwitchWrap>
          <span>计划中</span>
          <Switch checked={planned} onChange={() => onTogglePlan()} />
        </SwitchWrap>
      </CardHead>
      <CardIntro>预防{summary.disease}</CardIntro>
      {summary.intro && <CardMeta>{summary.intro}</CardMeta>}
      <CardMeta>
        <MetaText>
          共{summary.totalDose}剂 · 建议{summary.startAgeLabel}起接种
        </MetaText>
        {allDone ? (
          <DoneText>已全部接种 ✓</DoneText>
        ) : (
          <RegisterBtn
            onClick={(e) => {
              e.stopPropagation();
              onRegister();
            }}
          >
            {doneCount > 0 ? `已种${doneCount}剂 · 继续登记` : "登记接种"}
          </RegisterBtn>
        )}
      </CardMeta>
    </PaidCardWrap>
  );
}

export default PaidVaccineCard;
