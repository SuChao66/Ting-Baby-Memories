// 页签：记录列表 / 身高曲线 / 体重曲线 / 头围曲线
export type TabKey = "record" | "height" | "weight" | "head";

export const TABS: { key: TabKey; label: string }[] = [
  { key: "record", label: "记录列表" },
  { key: "height", label: "身高曲线" },
  { key: "weight", label: "体重曲线" },
  { key: "head", label: "头围曲线" },
];
