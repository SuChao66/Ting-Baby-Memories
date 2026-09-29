import DoseCard from "../DoseCard";
import type {
  IDoseWithStatus,
  IVaccineDose,
  IVaccineRecordItem,
} from "../../types";
import {
  GroupWrap,
  GroupHead,
  AgeDot,
  AgeTitle,
  CurrentTag,
  DoseList,
} from "./styles";

interface IProps {
  /** 组月龄文案，如 "6月龄" */
  ageLabel: string;
  /** 是否宝宝当前所处的月龄组 */
  isCurrent: boolean;
  /** 组内剂次（带状态） */
  doses: IDoseWithStatus[];
  /** 登记接种 */
  onRegister: (dose: IVaccineDose) => void;
  /** 查看接种记录（编辑） */
  onRecord: (record: IVaccineRecordItem) => void;
}

/** 按推荐月龄分组的时间轴容器 */
function AgeGroup({
  ageLabel,
  isCurrent,
  doses,
  onRegister,
  onRecord,
}: IProps) {
  // 组内全部已接种则节点显示完成色
  const allDone = doses.every((d) => d.status === "done");

  return (
    <GroupWrap>
      <GroupHead>
        <AgeDot $allDone={allDone} />
        <AgeTitle>{ageLabel}</AgeTitle>
        {isCurrent && <CurrentTag>当前阶段</CurrentTag>}
      </GroupHead>
      <DoseList>
        {doses.map((item) => (
          <DoseCard
            key={item.key}
            item={item}
            onRegister={onRegister}
            onRecord={onRecord}
          />
        ))}
      </DoseList>
    </GroupWrap>
  );
}

export default AgeGroup;
