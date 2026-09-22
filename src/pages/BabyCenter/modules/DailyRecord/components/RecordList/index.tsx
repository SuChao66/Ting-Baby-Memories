// 导入类型
import type { IGetDailyRecordItem } from "@/interface/dailyRecord";
// 导入常量
import { DAILY_RECORD_TYPES } from "@/enums";
import {
  DIAPER_STATUS_MAP,
  PEE_AMOUNT_MAP,
  POOP_COLOR_MAP,
  POOP_SHAPE_MAP
} from '../../constants'
// 导入配置
import { actionList, filterTypeOptions } from "../../actionConfig";
// 导入样式
import {
  RecordListWrap,
  RecordItem,
  RecordIconWrap,
  RecordContent,
  RecordTitle,
  RecordSummary,
  RecordRemark,
  RecordTime,
} from "./styles";
// 导入工具函数
import { formatTime, formatDuration } from "@/utils";

interface IProps {
  list: IGetDailyRecordItem[];
}

/** 获取类型的展示信息（图标、渐变色、中文名称） */
function getTypeMeta(type: string) {
  const action = actionList.find((a) => a.key === type);
  const label =
    filterTypeOptions.find((f) => f.value === type)?.label ?? "记录";
  return { icon: action?.icon, gradient: action?.gradient, label };
}

/** 按类型生成摘要文案（不同类型记录只含自身字段，缺失字段容错跳过） */
function getSummary(item: IGetDailyRecordItem): string {
  const parts: string[] = [];
  switch (item.type) {
    // 喂奶：亲喂显示左右侧时长与预估奶量，瓶喂显示配方奶/母乳量
    case DAILY_RECORD_TYPES.FEED:
      if (item.leftDuration) parts.push(`左侧${item.leftDuration}分钟`);
      if (item.rightDuration) parts.push(`右侧${item.rightDuration}分钟`);
      if (item.estimatedAmount) parts.push(`预估${item.estimatedAmount}ml`);
      if (item.formulaAmount) parts.push(`配方奶${item.formulaAmount}ml`);
      if (item.breastMilkAmount) parts.push(`母乳${item.breastMilkAmount}ml`);
      break;
    // 换尿布：尿布状态、尿量、便便颜色与形状、红屁股
    case DAILY_RECORD_TYPES.DIAPER:
      if (item.status) parts.push(DIAPER_STATUS_MAP[item.status] ?? item.status);
      if (item.peeAmount)
        parts.push(`尿量${PEE_AMOUNT_MAP[item.peeAmount] ?? item.peeAmount}`);
      if (item.poopColor)
        parts.push(POOP_COLOR_MAP[item.poopColor] ?? item.poopColor);
      if (item.poopShape)
        parts.push(POOP_SHAPE_MAP[item.poopShape] ?? item.poopShape);
      if (item.hasRash) parts.push("红屁股");
      break;
    // 辅食：食物名称与重量
    case DAILY_RECORD_TYPES.FOOD:
      if (item.foodName) parts.push(item.foodName);
      if (item.foodWeight) parts.push(item.foodWeight);
      break;
    // 其他事件：事件名称
    case DAILY_RECORD_TYPES.OTHER:
      if (item.eventName) parts.push(item.eventName);
      break;
    // 睡眠、洗澡、玩耍、游泳：持续时长
    case DAILY_RECORD_TYPES.SLEEP:
    case DAILY_RECORD_TYPES.BATH:
    case DAILY_RECORD_TYPES.PLAY:
    case DAILY_RECORD_TYPES.SWIM:
      if (item.duration) parts.push(`时长: ${formatDuration(item.duration, true)}`);
      break;
    default:
      break;
  }
  return parts.join(" · ");
}

function DailyRecordList(props: IProps) {
  const { list } = props;

  return (
    <RecordListWrap>
      {list.map((item) => {
        const { icon, gradient, label } = getTypeMeta(item.type);
        const summary = getSummary(item);
        return (
          <RecordItem key={item._id}>
            <RecordIconWrap $gradient={gradient}>{icon}</RecordIconWrap>
            <RecordContent>
              <RecordTitle>{label}</RecordTitle>
              {summary && <RecordSummary>{summary}</RecordSummary>}
              {item.remark && <RecordRemark>{item.remark}</RecordRemark>}
            </RecordContent>
            <RecordTime>
              {item.startTime ? formatTime(item.startTime) : "--:--"}
            </RecordTime>
          </RecordItem>
        );
      })}
    </RecordListWrap>
  );
}

export default DailyRecordList;
