import type { DoseStatus, VaccineTabKey } from "./types";

/** 接种状态常量（as const 派生 union，与 types.ts DoseStatus 对应） */
export const DOSE_STATUS = {
  DONE: "done", // 已接种
  OVERDUE: "overdue", // 已逾期
  DUE: "due", // 本月应种
  FUTURE: "future", // 未到月龄
} as const;

/** 页签配置 */
export const VACCINE_TABS: { key: VaccineTabKey; label: string }[] = [
  { key: "free", label: "免费疫苗" },
  { key: "paid", label: "自费疫苗" },
];

/** 状态徽标展示配置：文案 + 主题色（对齐 App 功能色板） */
export const DOSE_STATUS_META: Record<
  DoseStatus,
  { label: string; color: string; bg: string }
> = {
  done: { label: "已接种", color: "#00B578", bg: "rgba(0, 181, 120, 0.1)" },
  overdue: { label: "已逾期", color: "#FA5151", bg: "rgba(250, 81, 81, 0.1)" },
  due: { label: "本月应种", color: "#FFA940", bg: "rgba(255, 169, 64, 0.12)" },
  future: {
    label: "未到月龄",
    color: "#9C9C9C",
    bg: "rgba(156, 156, 156, 0.12)",
  },
};

/** 默认展示的自费主流疫苗（其余折叠进"查看全部疫苗库"），key 对应 data.ts 中剂次的 vaccineKey */
export const MAIN_PAID_VACCINE_KEYS = [
  "dtap-ipv-hib", // 五联疫苗
  "pcv13", // 13价肺炎疫苗
  "rotavirus", // 口服轮状疫苗
  "ev71", // 手足口（EV71）疫苗
  "varicella", // 水痘疫苗
  "influenza", // 流感疫苗
  "hib", // b型流感嗜血杆菌疫苗
] as const;
