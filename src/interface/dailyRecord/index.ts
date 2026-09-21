import type { DailyRecordType } from "@/types";

export interface IAddDailyRecordParams {
  babyId: string;
  type: DailyRecordType; // 记录类型
  /** 公共记录 */
  startTime?: Date; // 开始时间
  remark?: string; // 评价
  /** 洗澡、睡眠、玩耍、游泳、其他事件 */
  duration?: number; // 持续时间
  /** 其他事件 */
  eventName?: string; // 其他事件名称
  /** 辅食 */
  foodName?: string; // 辅食名称
  foodWeight?: string; // 辅食重量
  /** 换尿布 */
  status?: string; // 尿布状态
  poopColor?: string; // 臭臭颜色
  poopShape?: string; // 臭臭形状
  peeAmount?: string; // 尿量
  hasRash?: boolean; // 是否红屁股
  /** 喂奶 */
  endTime?: Date; // 结束时间
  // 亲喂
  breastMode?: string; // 亲喂模式：计时 / 手动输入
  leftDuration?: number; // 左侧喂时间 分钟
  rightDuration?: number; // 右侧喂时间 分钟
  lastUsedSide?: string; // 上一次喂的是左侧还是右侧
  estimatedAmount?: number; // 预估奶量 ml
  // 瓶喂
  formulaAmount?: number; // 配方奶 ml
  breastMilkAmount?: number; // 母乳 ml
}
