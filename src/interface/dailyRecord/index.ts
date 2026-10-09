import type { DailyRecordType } from "@/types";

// 新增日常记录
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

// 编辑日常记录
export type IEditDailyRecordParams = IAddDailyRecordParams & { id: string };

// 查询日常记录（按天全量返回，无分页）
export type ISearchDailyRecordParams = {
  babyId: string;
  date: string; // 按天查询，格式 YYYY-MM-DD
  type?: DailyRecordType; // 可选：按类型筛选（做统计时有用）
};

// 获取日常记录
export interface IGetDailyRecordListResponse {
  list: IGetDailyRecordItem[]
  total: number
}

export interface IGetDailyRecordItem {
  _id: string
  userId: string
  babyId: string
  type: string
  startTime: string
  remark: string
  breastMode: string
  leftDuration: number
  rightDuration: number
  lastUsedSide: string
  estimatedAmount: number
  formulaAmount: number
  breastMilkAmount: number
  status?: string
  poopColor?: string
  poopShape?: string
  peeAmount?: string
  hasRash?: boolean
  duration?: number
  eventName?: string
  foodName?: string
  foodWeight?: string
  createdAt: string
  updatedAt: string
  __v: number
}
