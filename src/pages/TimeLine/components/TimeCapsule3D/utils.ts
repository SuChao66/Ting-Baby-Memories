// 导入类型与常量
import type { ICapsuleTimelineItem, IFile } from "@/interface/timeline";
import type {
  ICapsuleAggregate,
  ICapsuleData,
  ICapsuleSourceItem,
  IMonthCluster,
} from "./types";
import {
  CAPSULE_PALETTE,
  MILESTONE_COLOR,
  NODE_SIZE_CONFIG,
  TUNNEL_CONFIG,
} from "./types";

/** 常见标签固定取色（未命中走哈希兜底） */
const TAG_COLOR_MAP: Record<string, string> = {
  成长: "#FF6B8A",
  大事记: MILESTONE_COLOR,
  里程碑: MILESTONE_COLOR,
  第一次: "#FFD700",
  健康: "#7ED957",
  日常: "#B388FF",
  萌照: "#64B5F6",
};

/** 字符串哈希（确定性，保证同一标签颜色稳定） */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/** 标签取色：映射优先，未知标签从五色调色板哈希取色 */
export function getTagColor(tags: string[]): string {
  if (tags.length > 0) {
    const mapped = TAG_COLOR_MAP[tags[0]];
    if (mapped) return mapped;
    return CAPSULE_PALETTE[hashString(tags[0]) % CAPSULE_PALETTE.length];
  }
  return CAPSULE_PALETTE[0];
}

/** 取记录首个图片文件地址 */
export function getFirstImage(files: IFile[] | undefined): string | undefined {
  const image = files?.find((file) => file.type === "IMAGE");
  return image?.url;
}

/** 时光隧道坐标：t ∈ [0,1]，0 = 出生端（隧道深处），1 = 当前端（洞口近端） */
export function getTunnelPosition(t: number): [number, number, number] {
  const { turns, radius, depth, startAngle } = TUNNEL_CONFIG;
  // 节点贴隧道内壁螺旋缠绕：角度随时间转，深度随时间逼近洞口
  const angle = startAngle + t * turns * Math.PI * 2;
  const z = -depth * (1 - t);
  return [
    Number((radius * Math.cos(angle)).toFixed(4)),
    Number((radius * Math.sin(angle)).toFixed(4)),
    Number(z.toFixed(4)),
  ];
}

/** 归一化为精简胶囊记录（兼容全量接口投影与分页完整结构） */
export function normalizeCapsuleItem(
  item: ICapsuleSourceItem,
): ICapsuleTimelineItem {
  return {
    _id: item._id,
    content: item.content || "",
    files: item.files || [],
    tags: item.tags || [],
    isMilestone: Boolean(item.isMilestone),
    publishTime: item.publishTime,
  };
}

/** 记录 → 月内数据（月内列表与摘要卡片共用） */
export function buildCapsuleData(item: ICapsuleTimelineItem): ICapsuleData {
  return {
    id: item._id,
    color: getTagColor(item.tags),
    isMilestone: item.isMilestone,
    publishTime: item.publishTime,
    content: item.content,
    thumbUrl: getFirstImage(item.files),
    files: item.files || [],
    tags: item.tags,
  };
}

/** 按月聚合：记录数组 → 月份簇数组（时间正序排布时光隧道，节点数 = 月份数） */
export function groupByMonth(items: ICapsuleTimelineItem[]): ICapsuleAggregate {
  if (items.length === 0) {
    return { clusters: [], total: 0, range: null };
  }

  // 按 YYYY-MM 分桶：与列表页一致用本地时区解析，避免 UTC 字符串截取把月初凌晨记录错划进上一月
  const buckets = new Map<string, ICapsuleTimelineItem[]>();
  for (const item of items) {
    const date = new Date(item.publishTime);
    const month = Number.isNaN(date.getTime())
      ? ""
      : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const bucket = buckets.get(month);
    if (bucket) {
      bucket.push(item);
    } else {
      buckets.set(month, [item]);
    }
  }

  // 月份时间正序（Map 保持插入序，倒序输入先反转键）
  const months = Array.from(buckets.keys()).sort();
  const clusters: IMonthCluster[] = months.map((month, index) => {
    const records = buckets.get(month)!;
    const t = months.length > 1 ? index / (months.length - 1) : 0.5;
    // 主导标签 = 出现次数最多（并列取先出现）
    const tagCount = new Map<string, number>();
    for (const record of records) {
      for (const tag of record.tags) {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
      }
    }
    let dominantTag = "";
    let maxCount = 0;
    for (const [tag, count] of tagCount) {
      if (count > maxCount) {
        dominantTag = tag;
        maxCount = count;
      }
    }
    return {
      month,
      count: records.length,
      position: getTunnelPosition(t),
      color: dominantTag ? getTagColor([dominantTag]) : CAPSULE_PALETTE[4],
      dominantTag,
      hasMilestone: records.some((record) => record.isMilestone),
      capsules: records.map((record) => buildCapsuleData(record)),
    };
  });

  return {
    clusters,
    total: items.length,
    range: { start: months[0], end: months[months.length - 1] },
  };
}

/** 月份节点半径：基础 + 每条记录增量，封顶 */
export function getClusterNodeSize(count: number): number {
  const { baseSize, perRecord, maxSize } = NODE_SIZE_CONFIG;
  return Math.min(baseSize + count * perRecord, maxSize);
}
