// 导入精简时间线项类型与素材文件类型
import type { ICapsuleTimelineItem, IFile } from "@/interface/timeline";

/** 主题五色调色板（粉、金、绿、紫、蓝） */
export const CAPSULE_PALETTE = [
  "#FF6B8A",
  "#FFD700",
  "#7ED957",
  "#B388FF",
  "#64B5F6",
] as const;

/** 里程碑专用金色 */
export const MILESTONE_COLOR = "#FFAA00";

/** 时光隧道两端颜色：深处（出生端）蓝 / 洞口（当前端）粉 */
export const TUNNEL_START_COLOR = "#64B5F6";
export const TUNNEL_END_COLOR = "#FF6B8A";

/** 时光隧道参数：隧道轴沿 -Z 延伸，相机立于洞口望向深处 */
export const TUNNEL_CONFIG = {
  /** 月份节点沿隧道内壁螺旋缠绕的圈数 */
  turns: 3,
  /** 隧道半径（内壁） */
  radius: 3,
  /** 隧道深度：洞口（当前月）到深处（出生月）的轴向距离 */
  depth: 30,
  /** 螺旋起始相位角，让入口节点不在正右侧 */
  startAngle: Math.PI * 0.5,
} as const;

/** 节点尺寸参数 */
export const NODE_SIZE_CONFIG = {
  /** 基础节点半径 */
  baseSize: 0.18,
  /** 每条记录的增量 */
  perRecord: 0.012,
  /** 节点尺寸上限 */
  maxSize: 0.5,
} as const;

/** 月份簇：全局视图发光节点（节点数 = 月份数，恒定不随记录数增长） */
export interface IMonthCluster {
  /** 月份，格式 YYYY-MM */
  month: string;
  /** 当月记录数，驱动节点大小 */
  count: number;
  /** 时光隧道坐标（内壁螺旋分布） */
  position: [number, number, number];
  /** 主导标签映射色 */
  color: string;
  /** 主导标签名 */
  dominantTag: string;
  /** 是否含里程碑（节点带金色光晕） */
  hasMilestone: boolean;
  /** 当月胶囊数据，点击飞入时用于构建实例 */
  capsules: ICapsuleData[];
}

/** 月内记录：月内列表与摘要卡片共用数据 */
export interface ICapsuleData {
  /** 记录 id */
  id: string;
  /** 标签取色（列表色条） */
  color: string;
  isMilestone: boolean;
  publishTime: string;
  content: string;
  /** 首图缩略图地址 */
  thumbUrl?: string;
  /** 完整素材列表（图片 / 视频 / 音频） */
  files: IFile[];
  tags: string[];
}

/** 聚合结果：月份簇数组 + 总记录数 */
export interface ICapsuleAggregate {
  clusters: IMonthCluster[];
  total: number;
  /** 最早与最近月份，用于轨道渐变与文案 */
  range: { start: string; end: string } | null;
}

/** 时间线记录 → 胶囊数据的转换入参兼容类型 */
export type ICapsuleSourceItem = Pick<
  ICapsuleTimelineItem,
  "_id" | "content" | "files" | "tags" | "isMilestone" | "publishTime"
>;
