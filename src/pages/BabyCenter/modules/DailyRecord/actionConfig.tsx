// 导入常量
import { DAILY_RECORD_TYPES } from "@/enums/constants";
// 导入类型
import type { DailyRecordType } from "@/types";
// 导入工具函数
import { vw } from "@/utils";
// 导入图标
import {
  GiMilkCarton,
  GiBathtub,
  GiBabyBottle,
  GiShower,
} from "react-icons/gi";
import {
  FaBaby,
  FaUmbrellaBeach,
  FaSwimmer,
  FaClipboardList,
} from "react-icons/fa";

/** 底部操作按钮配置 */
export const actionList: {
  key: DailyRecordType;
  label: string;
  icon: JSX.Element;
  gradient: string;
}[] = [
  {
    key: DAILY_RECORD_TYPES.FEED,
    label: "+喂奶",
    icon: <GiBabyBottle color="#fff" size={vw(26)} />,
    gradient: "linear-gradient(135deg, #ffb199 0%, #ff8a80 100%)",
  },
  {
    key: DAILY_RECORD_TYPES.DIAPER,
    label: "+换尿布",
    icon: <GiMilkCarton color="#fff" size={vw(24)} />,
    gradient: "linear-gradient(135deg, #ffcc80 0%, #ff8a65 100%)",
  },
  {
    key: DAILY_RECORD_TYPES.SLEEP,
    label: "+睡眠",
    icon: <FaBaby color="#fff" size={vw(24)} />,
    gradient: "linear-gradient(135deg, #b39ddb 0%, #7c4dff 100%)",
  },
  {
    key: DAILY_RECORD_TYPES.FOOD,
    label: "+辅食",
    icon: <FaUmbrellaBeach color="#fff" size={vw(22)} />,
    gradient: "linear-gradient(135deg, #80e0b0 0%, #4ecdc4 100%)",
  },
  {
    key: DAILY_RECORD_TYPES.BATH,
    label: "+洗澡",
    icon: <GiShower color="#fff" size={vw(24)} />,
    gradient: "linear-gradient(135deg, #81d4fa 0%, #4fc3f7 100%)",
  },
  {
    key: DAILY_RECORD_TYPES.PLAY,
    label: "+玩耍",
    icon: <GiBathtub color="#fff" size={vw(24)} />,
    gradient: "linear-gradient(135deg, #f8bbd0 0%, #ec407a 100%)",
  },
  {
    key: DAILY_RECORD_TYPES.SWIM,
    label: "+游泳",
    icon: <FaSwimmer color="#fff" size={vw(22)} />,
    gradient: "linear-gradient(135deg, #90caf9 0%, #42a5f5 100%)",
  },
  {
    key: DAILY_RECORD_TYPES.OTHER,
    label: "+其他事件",
    icon: <FaClipboardList color="#fff" size={vw(22)} />,
    gradient: "linear-gradient(135deg, #ffab91 0%, #ff8a80 100%)",
  },
];

/** 各记录类型对应的添加文案配置 */
export const recordTypeConfig: Record<
  DailyRecordType,
  { title: string; actionText: string; continueText: string }
> = {
  [DAILY_RECORD_TYPES.FEED]: {
    title: "添加喂奶记录",
    actionText: "开始喂奶",
    continueText: "继续喂奶",
  },
  [DAILY_RECORD_TYPES.DIAPER]: {
    title: "添加换尿布记录",
    actionText: "记录换尿布",
    continueText: "继续换尿布",
  },
  [DAILY_RECORD_TYPES.SLEEP]: {
    title: "添加睡眠记录",
    actionText: "开始睡觉",
    continueText: "继续睡觉",
  },
  [DAILY_RECORD_TYPES.FOOD]: {
    title: "添加辅食记录",
    actionText: "开始吃辅食",
    continueText: "继续吃辅食",
  },
  [DAILY_RECORD_TYPES.BATH]: {
    title: "添加洗澡记录",
    actionText: "开始洗澡",
    continueText: "继续洗澡",
  },
  [DAILY_RECORD_TYPES.PLAY]: {
    title: "添加玩耍记录",
    actionText: "开始玩耍",
    continueText: "继续玩耍",
  },
  [DAILY_RECORD_TYPES.SWIM]: {
    title: "添加游泳记录",
    actionText: "开始游泳",
    continueText: "继续游泳",
  },
  [DAILY_RECORD_TYPES.OTHER]: {
    title: "添加其他事件",
    actionText: "记录事件",
    continueText: "继续记录",
  },
};

/** 公共类型 */
export const COMMON_DAIYL_RECORD_TYPE = [
  DAILY_RECORD_TYPES.SLEEP,
  DAILY_RECORD_TYPES.FOOD,
  DAILY_RECORD_TYPES.BATH,
  DAILY_RECORD_TYPES.PLAY,
  DAILY_RECORD_TYPES.SWIM,
  DAILY_RECORD_TYPES.OTHER,
];

/** 记录类型筛选选项（按类型查询用） */
export const filterTypeOptions: { value: DailyRecordType; label: string }[] = [
  { value: DAILY_RECORD_TYPES.FEED, label: "喂奶" },
  { value: DAILY_RECORD_TYPES.DIAPER, label: "换尿布" },
  { value: DAILY_RECORD_TYPES.SLEEP, label: "睡眠" },
  { value: DAILY_RECORD_TYPES.FOOD, label: "辅食" },
  { value: DAILY_RECORD_TYPES.BATH, label: "洗澡" },
  { value: DAILY_RECORD_TYPES.PLAY, label: "玩耍" },
  { value: DAILY_RECORD_TYPES.SWIM, label: "游泳" },
  { value: DAILY_RECORD_TYPES.OTHER, label: "其他" },
];
