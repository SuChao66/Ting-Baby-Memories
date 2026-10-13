// 导入 hooks 与图标
import { useMemo } from "react";
import { AiOutlineStar } from "react-icons/ai";
// 导入列表样式（集中定义于本目录 styles.ts）
import {
  ListCard,
  ListInner,
  ListHead,
  ListTitle,
  ListCount,
  ListBody,
  RecordItem,
  RecordBar,
  RecordInfo,
  RecordTime,
  RecordMilestone,
  RecordContent,
} from "./styles";
// 导入月内记录类型
import type { ICapsuleData } from "../../types";

/** 格式化列表时间：ISO / 时间戳字符串 → 'MM-DD HH:mm'（月份已在标题展示） */
function formatRecordTime(publishTime: string): string {
  const date = new Date(publishTime);
  if (Number.isNaN(date.getTime())) return publishTime;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}`;
}

interface IProps {
  /** 聚焦月份，格式 YYYY-MM */
  month: string;
  /** 当月记录数据 */
  capsules: ICapsuleData[];
  /** 点击记录回调（打开摘要卡片） */
  onPick: (capsule: ICapsuleData) => void;
}

/** 月内视图层：当月记录列表覆盖层（时间 + 内容摘要，点击查看详情） */
function MonthRecordList(props: IProps) {
  const { month, capsules, onPick } = props;

  // 倒序浏览：最新记录在最上；capsules 引用稳定时仅排序一次
  const sorted = useMemo(
    () =>
      [...capsules].sort(
        (a, b) =>
          new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime(),
      ),
    [capsules],
  );

  // 标题文案：YYYY-MM → YYYY年M月
  const [year, monthNum] = month.split("-");
  const title = `${year}年${Number(monthNum)}月`;

  return (
    <ListCard>
      <ListInner>
        <ListHead>
          <ListTitle>{title}</ListTitle>
          <ListCount>{sorted.length} 条记录</ListCount>
        </ListHead>
        <ListBody>
          {sorted.map((capsule) => (
            <RecordItem key={capsule.id} onClick={() => onPick(capsule)}>
              <RecordBar $color={capsule.color} />
              <RecordInfo>
                <RecordTime>
                  {formatRecordTime(capsule.publishTime)}
                  {capsule.isMilestone && (
                    <RecordMilestone>
                      <AiOutlineStar />
                      里程碑
                    </RecordMilestone>
                  )}
                </RecordTime>
                <RecordContent>
                  {capsule.content.trim() || "（图文记录，点击查看）"}
                </RecordContent>
              </RecordInfo>
            </RecordItem>
          ))}
        </ListBody>
      </ListInner>
    </ListCard>
  );
}

export default MonthRecordList;
