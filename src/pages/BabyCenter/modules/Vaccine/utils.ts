/** 生日 + N 月龄（± 偏移天）的日期字符串 YYYY-MM-DD */
export function addMonths(birthday: Date, months: number, offsetDays = 0): string {
  const d = new Date(birthday.getTime());
  d.setMonth(d.getMonth() + months);
  d.setDate(d.getDate() + offsetDays);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** 计算满月龄（按日对齐，不足月不计） */
export function calcAgeMonths(birthday: Date, now = new Date()): number {
  let months =
    (now.getFullYear() - birthday.getFullYear()) * 12 +
    (now.getMonth() - birthday.getMonth());
  if (now.getDate() < birthday.getDate()) months -= 1;
  return Math.max(0, months);
}

/** 月龄展示文案：7 → "7个月"；26 → "2岁2个月" */
export function ageTextOf(months: number): string {
  if (months < 12) return `${months}个月`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return rest > 0 ? `${years}岁${rest}个月` : `${years}岁`;
}

/** 月龄 → 排期文案：0 → 出生时；1~35 → X月龄；≥36 → X岁 */
export function ageLabelOf(months: number): string {
  if (months === 0) return "出生时";
  if (months < 36) return `${months}月龄`;
  return `${Math.round(months / 12)}岁`;
}

/**
 * 推导剂次接种状态
 * 已种 → 逾期（超推荐月龄 1 个月）→ 本月应种（推荐月龄 ±1 个月窗口）→ 未到月龄
 */
export function deriveStatus(
  recommendAge: number,
  ageMonths: number,
  hasRecord: boolean,
): "done" | "overdue" | "due" | "future" {
  if (hasRecord) return "done";
  if (ageMonths > recommendAge + 1) return "overdue";
  if (ageMonths >= recommendAge - 1 && ageMonths <= recommendAge + 1) {
    return "due";
  }
  return "future";
}
