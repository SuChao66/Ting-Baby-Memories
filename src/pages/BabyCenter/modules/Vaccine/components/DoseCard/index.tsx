import { DOSE_STATUS_META } from "../../constants";
import type { IDoseWithStatus, IVaccineDose, IVaccineRecordItem } from "../../types";
import {
  DoseCardWrap,
  CardHead,
  DoseName,
  DoseTag,
  StatusBadge,
  CardSub,
  CardFoot,
  RecordInfo,
  RecordDate,
  RecordPlace,
  FootTip,
  RegisterBtn,
} from "./styles";

interface IProps {
  /** 带状态的剂次 */
  item: IDoseWithStatus;
  /** 登记接种 */
  onRegister: (dose: IVaccineDose) => void;
  /** 查看接种记录（编辑） */
  onRecord: (record: IVaccineRecordItem) => void;
}

/** 单剂次卡片 */
function DoseCard({ item, onRegister, onRecord }: IProps) {
  const meta = DOSE_STATUS_META[item.status];
  const isDone = item.status === "done";
  const showRegister = item.status === "due" || item.status === "overdue";

  return (
    <DoseCardWrap
      $clickable={isDone}
      onClick={() => {
        if (isDone && item.record) onRecord(item.record);
      }}
    >
      <CardHead>
        <DoseName>{item.vaccineName}</DoseName>
        <DoseTag>
          第{item.dose}/{item.totalDose}剂
        </DoseTag>
        <StatusBadge $color={meta.color} $bg={meta.bg}>
          {meta.label}
        </StatusBadge>
      </CardHead>
      <CardSub>
        预防{item.disease} · 建议{item.ageLabel}接种
      </CardSub>

      {isDone && item.record && (
        <CardFoot>
          <RecordInfo>
            <RecordDate>{item.record.injectDate}</RecordDate>
            {item.record.hospital && (
              <RecordPlace>@{item.record.hospital}</RecordPlace>
            )}
          </RecordInfo>
        </CardFoot>
      )}

      {showRegister && (
        <CardFoot>
          <FootTip>
            {item.status === "overdue"
              ? "已超推荐接种时间，建议尽快补种"
              : "到了推荐接种时间，记得带宝宝去打疫苗"}
          </FootTip>
          <RegisterBtn
            onClick={(e) => {
              e.stopPropagation();
              onRegister(item);
            }}
          >
            {item.status === "overdue" ? "补种登记" : "登记接种"}
          </RegisterBtn>
        </CardFoot>
      )}
    </DoseCardWrap>
  );
}

export default DoseCard;
