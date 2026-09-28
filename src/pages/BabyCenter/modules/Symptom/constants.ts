import { SYMPTOM_GROUPS, MEDICATION_USAGE_TYPES } from "@/enums/constants";

/** 症状分组选项（value 与后端枚举一致，与设计图症状记录页分组对应） */
export const symptomGroups: {
  label: string;
  options: { value: string; label: string }[];
}[] = SYMPTOM_GROUPS.map((group) => ({
  label: group.label,
  options: group.options.map((option) => ({ ...option })),
}));

/** 症状 value -> 中文映射（列表摘要展示用，与录入表单文案同源） */
export const SYMPTOM_LABEL_MAP = Object.fromEntries(
  symptomGroups.flatMap((group) =>
    group.options.map(({ value, label }) => [value, label]),
  ),
);

/** 药品使用类型选项 */
export const medicationUsageTypeOptions: {
  value: string;
  label: string;
}[] = [
  { value: MEDICATION_USAGE_TYPES.INTERNAL, label: "内服" },
  { value: MEDICATION_USAGE_TYPES.EXTERNAL, label: "外用" },
];

/** 药品使用类型 value -> 中文映射 */
export const MEDICATION_USAGE_LABEL_MAP = Object.fromEntries(
  medicationUsageTypeOptions.map(({ value, label }) => [value, label]),
);
