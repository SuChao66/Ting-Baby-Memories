/**
 * 婴幼儿身高体重标准对照数据
 *
 * 数据来源：图片《2025儿童身高体重标准表》
 * 每个月龄给出 [下限, 上限] 范围，低于下限或高于上限视为偏离正常范围。
 * 月龄 0 = 出生时，78 = 6岁半。
 */

/** 单条标准数据 */
export interface IStdPoint {
  /** 月龄 */
  month: number;
  /** 下限 */
  low: number;
  /** 上限 */
  high: number;
}

/** 某性别的标准数据集 */
interface IStdDataset {
  height: IStdPoint[];
  weight: IStdPoint[];
}

/** 男孩标准数据 */
export const BOY_STANDARD: IStdDataset = {
  height: [
    { month: 0, low: 47.6, high: 54.8 },
    { month: 1, low: 51.3, high: 59.0 },
    { month: 2, low: 54.9, high: 63.0 },
    { month: 3, low: 58.0, high: 66.4 },
    { month: 4, low: 60.5, high: 69.1 },
    { month: 5, low: 62.5, high: 71.3 },
    { month: 6, low: 64.2, high: 73.2 },
    { month: 7, low: 65.7, high: 74.9 },
    { month: 8, low: 67.1, high: 76.4 },
    { month: 9, low: 68.3, high: 77.8 },
    { month: 10, low: 69.5, high: 79.1 },
    { month: 11, low: 70.7, high: 80.3 },
    { month: 12, low: 71.7, high: 81.6 },
    { month: 18, low: 77.7, high: 88.5 },
    { month: 24, low: 82.4, high: 94.0 },
    { month: 30, low: 87.0, high: 99.4 },
    { month: 36, low: 90.9, high: 104.1 },
    { month: 42, low: 94.4, high: 108.3 },
    { month: 48, low: 97.6, high: 112.2 },
    { month: 54, low: 100.8, high: 116.0 },
    { month: 60, low: 104.1, high: 119.9 },
    { month: 66, low: 107.2, high: 123.7 },
    { month: 72, low: 110.3, high: 127.3 },
    { month: 78, low: 113.1, high: 130.8 },
  ],
  weight: [
    { month: 0, low: 2.8, high: 4.2 },
    { month: 1, low: 3.7, high: 5.6 },
    { month: 2, low: 4.7, high: 7.1 },
    { month: 3, low: 5.5, high: 8.3 },
    { month: 4, low: 6.1, high: 9.2 },
    { month: 5, low: 6.6, high: 9.8 },
    { month: 6, low: 6.9, high: 10.3 },
    { month: 7, low: 7.2, high: 10.8 },
    { month: 8, low: 7.5, high: 11.1 },
    { month: 9, low: 7.7, high: 11.5 },
    { month: 10, low: 7.9, high: 11.8 },
    { month: 11, low: 8.1, high: 12.0 },
    { month: 12, low: 8.3, high: 12.3 },
    { month: 18, low: 9.3, high: 13.8 },
    { month: 24, low: 10.4, high: 15.4 },
    { month: 30, low: 11.2, high: 16.7 },
    { month: 36, low: 12.8, high: 18.0 },
    { month: 42, low: 12.8, high: 19.4 },
    { month: 48, low: 13.6, high: 20.8 },
    { month: 54, low: 14.5, high: 22.4 },
    { month: 60, low: 15.3, high: 24.2 },
    { month: 66, low: 16.2, high: 26.0 },
    { month: 72, low: 17.1, high: 27.9 },
    { month: 78, low: 17.8, high: 29.8 },
  ],
};

/** 女孩标准数据 */
export const GIRL_STANDARD: IStdDataset = {
  height: [
    { month: 0, low: 46.8, high: 53.8 },
    { month: 1, low: 50.4, high: 57.8 },
    { month: 2, low: 53.8, high: 61.8 },
    { month: 3, low: 56.7, high: 64.8 },
    { month: 4, low: 59.1, high: 67.4 },
    { month: 5, low: 61.0, high: 69.6 },
    { month: 6, low: 62.7, high: 71.5 },
    { month: 7, low: 64.2, high: 73.1 },
    { month: 8, low: 65.6, high: 74.7 },
    { month: 9, low: 66.8, high: 76.1 },
    { month: 10, low: 68.1, high: 77.5 },
    { month: 11, low: 69.2, high: 78.8 },
    { month: 12, low: 70.4, high: 80.1 },
    { month: 18, low: 76.5, high: 87.2 },
    { month: 24, low: 81.3, high: 92.8 },
    { month: 30, low: 85.7, high: 98.1 },
    { month: 36, low: 89.7, high: 102.7 },
    { month: 42, low: 93.2, high: 106.9 },
    { month: 48, low: 96.5, high: 110.9 },
    { month: 54, low: 99.7, high: 114.7 },
    { month: 60, low: 103.0, high: 118.6 },
    { month: 66, low: 106.1, high: 122.4 },
    { month: 72, low: 109.0, high: 126.0 },
    { month: 78, low: 111.8, high: 125.4 },
  ],
  weight: [
    { month: 0, low: 2.7, high: 4.1 },
    { month: 1, low: 3.5, high: 5.3 },
    { month: 2, low: 4.4, high: 6.6 },
    { month: 3, low: 5.1, high: 7.6 },
    { month: 4, low: 5.6, high: 8.4 },
    { month: 5, low: 6.0, high: 9.1 },
    { month: 6, low: 6.4, high: 9.6 },
    { month: 7, low: 6.7, high: 10.0 },
    { month: 8, low: 6.9, high: 10.4 },
    { month: 9, low: 7.2, high: 10.8 },
    { month: 10, low: 7.4, high: 11.1 },
    { month: 11, low: 7.6, high: 11.4 },
    { month: 12, low: 7.7, high: 11.6 },
    { month: 18, low: 8.8, high: 13.2 },
    { month: 24, low: 9.8, high: 14.8 },
    { month: 30, low: 10.7, high: 16.2 },
    { month: 36, low: 11.5, high: 17.7 },
    { month: 42, low: 12.5, high: 19.1 },
    { month: 48, low: 13.1, high: 20.5 },
    { month: 54, low: 13.9, high: 21.9 },
    { month: 60, low: 14.7, high: 23.4 },
    { month: 66, low: 15.5, high: 25.1 },
    { month: 72, low: 16.3, high: 26.8 },
    { month: 78, low: 17.0, high: 28.5 },
  ],
};

/**
 * 根据性别获取标准数据
 * @param gender 0=女孩, 1=男孩
 * @param field "height" | "weight"
 */
export function getStandardData(
  gender: 0 | 1 | null | undefined,
  field: "height" | "weight",
): IStdPoint[] {
  if (gender === 1) return BOY_STANDARD[field];
  return GIRL_STANDARD[field];
}

/**
 * 计算宝宝某日期时的月龄
 * @param birthDate 宝宝出生日期（ISO 字符串）
 * @param targetDate 目标日期（ISO 字符串 或 YYYY-MM-DD）
 * @returns 月龄（可能为小数）
 */
export function calcMonthAge(birthDate: string, targetDate: string): number {
  const birth = new Date(birthDate.split("T")[0]);
  const target = new Date(targetDate.split("T")[0]);
  if (isNaN(birth.getTime()) || isNaN(target.getTime())) return 0;
  const diffMs = target.getTime() - birth.getTime();
  const days = diffMs / (1000 * 60 * 60 * 24);
  return days / 30.44; // 平均每月 30.44 天
}

/**
 * 在标准数据点中，按月龄线性插值得到上下限
 */
export function interpStd(
  stdData: IStdPoint[],
  month: number,
): { low: number; high: number } | null {
  if (!stdData.length) return null;
  // 低于最小月龄
  if (month <= stdData[0].month)
    return { low: stdData[0].low, high: stdData[0].high };
  // 高于最大月龄
  const last = stdData[stdData.length - 1];
  if (month >= last.month) return { low: last.low, high: last.high };
  // 线性插值
  for (let i = 0; i < stdData.length - 1; i++) {
    const a = stdData[i];
    const b = stdData[i + 1];
    if (month >= a.month && month <= b.month) {
      const t = (month - a.month) / (b.month - a.month);
      return {
        low: +(a.low + t * (b.low - a.low)).toFixed(1),
        high: +(a.high + t * (b.high - a.high)).toFixed(1),
      };
    }
  }
  return null;
}