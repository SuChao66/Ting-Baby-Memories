import { useCallback, useEffect, useState } from "react";
// 导入接口
import { getAllTimeLineListApi, getTimeLineListApi } from "@/api/timeline";
// 导入类型
import type { ICapsuleTimelineItem } from "@/interface/timeline";

/** 时间线记录 */
export type ICapsuleSourceItem = Pick<
  ICapsuleTimelineItem,
  "_id" | "content" | "files" | "tags" | "isMilestone" | "publishTime"
>;

/** 归一化为精简胶囊记录（兼容全量接口投影与分页完整结构） */
export function normalizeCapsuleItem(
  item: ICapsuleSourceItem,
): ICapsuleTimelineItem {
  if (item.isMilestone) {
    return {
      _id: item._id,
      content: item.content || "",
      files: item.files || [],
      tags: item.tags || [],
      isMilestone: Boolean(item.isMilestone),
      publishTime: item.publishTime,
    };
  }
}

/** 降级分页拉取的每页条数 */
const FALLBACK_PAGE_SIZE = 50;

interface IUseCapsuleDataResult {
  /** 是否加载中 */
  loading: boolean;
  /** 加载进度 0-100 */
  progress: number;
  /** 精简记录数组（时间倒序） */
  items: ICapsuleTimelineItem[];
  /** 全量与降级均失败 */
  error: boolean;
  /** 失败后重新加载 */
  retry: () => void;
}

/**
 * 3D数据 Hook：全量接口优先，失败自动降级分页循环拉取
 * - 进度回调驱动加载动画（分页场景按已拉取/总数计算，全量场景直接满格）
 * - 卸载或 babyId 变化时通过 AbortController 中止未完成请求
 */
export function useMilestoneData(
  babyId: string,
  isMilestone?: boolean,
): IUseCapsuleDataResult {
  // 是否加载中
  const [loading, setLoading] = useState(true);
  // 加载进度
  const [progress, setProgress] = useState(0);
  // 精简记录数组
  const [items, setItems] = useState<ICapsuleTimelineItem[]>([]);
  // 全量与降级均失败
  const [error, setError] = useState(false);
  // 失败重试
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    /** 成功收尾 */
    const finish = (list: ICapsuleTimelineItem[]) => {
      if (cancelled) return;
      setItems(list);
      setProgress(100);
      setError(false);
      setLoading(false);
    };

    /** 失败收尾 */
    const fail = () => {
      if (cancelled) return;
      setError(true);
      setLoading(false);
    };

    /** 降级方案：分页循环拉取（首页得 total，pageSize=50 循环） */
    const loadByPage = async () => {
      const list: ICapsuleTimelineItem[] = [];
      let page = 1;
      // eslint-disable-next-line no-useless-assignment
      let total = Infinity;

      while (!cancelled) {
        const res = await getTimeLineListApi(
          { babyId, page, pageSize: FALLBACK_PAGE_SIZE },
          { signal: controller.signal },
        );
        if (cancelled) return;
        total = res.data.total;
        list.push(...res.data.data.map(normalizeCapsuleItem));
        // 进度上限 95%，满格留给聚合完成
        if (total > 0) {
          setProgress(Math.min(Math.round((list.length / total) * 95), 95));
        }
        page += 1;
        // 空页或已拉满则结束，防御 total 异常导致的死循环
        if (res.data.data.length === 0 || list.length >= total) break;
      }
      finish(list);
    };

    /** 请求数据 */
    const load = async () => {
      setLoading(true);
      setProgress(0);
      setError(false);
      try {
        // 优先全量接口：单次请求、投影精简、快照一致
        const res = await getAllTimeLineListApi(
          { babyId, isMilestone },
          { signal: controller.signal },
        );
        if (cancelled) return;
        // 处理数据
        finish(res.data.data.map(normalizeCapsuleItem));
      } catch (err) {
        console.error("[TimeCapsule3D] 全量接口不可用，降级分页拉取:", err);
        if (cancelled) return;
        try {
          await loadByPage();
        } catch (fallbackErr) {
          console.error("[TimeCapsule3D] 分页降级失败:", fallbackErr);
          fail();
        }
      }
    };
    load();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [babyId, reloadKey]);

  // 重新获取
  // useCallback: 缓存的是函数本身
  const retry = useCallback(() => setReloadKey((key) => key + 1), []);

  return { loading, progress, items, error, retry };
}
