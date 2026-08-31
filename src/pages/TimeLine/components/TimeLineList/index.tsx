import { useState, useEffect, useRef } from "react";
// 导入样式
import {
  TimelineWrapper,
  TimelineGroup,
  DateLabel,
  LoadMoreTip,
} from "./styles";
// 导入组件
import Empty from "@/baseUI/empty";
import TimeLineCard from "../TimeLineCard";
// 导入store
import { useTimelineStore } from "@/store";
// 导入类型
import type { ITimelineItem, ITimelineGroup } from "@/interface/timeline";
// 导入context
import { TimeLineContext } from "@/context";
// 导入工具函数
import { getTodayDate } from "@/utils";

const PAGE_SIZE = 10;
// 滚动触底阈值（px）
const SCROLL_THRESHOLD = 80;

function TimeLineList(props: { id: string }) {
  const { id } = props;
  // 分页状态
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // 累积所有页的原始数据，分页加载后重新分组
  const allItemsRef = useRef<ITimelineItem[]>([]);
  // 刷新获取记录列表
  const [refreshKey, setRefreshKey] = useState(0);
  // 今天日期
  const { year, month, day } = getTodayDate();
  const todayKey = `${year}年${month}月${day}日`;
  const { timeLineList, getTimeLineList, setTimelineList } = useTimelineStore(
    (state) => state,
  );

  // 初始加载 & 刷新
  useEffect(() => {
    allItemsRef.current = [];
    setPage(1);
    setHasMore(true);
    loadList(1, true);
  }, [refreshKey]);

  // 加载某一页数据
  // isReset: 是否重新加载
  const loadList = async (pageNum: number, isReset: boolean) => {
    if (loading) return;
    setLoading(true);
    try {
      const params = {
        babyId: id,
        page: pageNum,
        pageSize: PAGE_SIZE,
      };
      const res = await getTimeLineList(params);
      if (!res) return;
      const list = res.data || [];
      // 累积原始数据（重置时替换，翻页时拼接）
      allItemsRef.current = isReset ? list : [...allItemsRef.current, ...list];
      // 已加载数量 >= 总数，说明没有更多了
      setHasMore(allItemsRef.current.length < res.total);
      // 基于全量数据重新分组
      handleData(allItemsRef.current);
    } finally {
      setLoading(false);
    }
  };

  // 处理数据 - 按日期分组
  const handleData = (data: ITimelineItem[]) => {
    const groupMap: Record<string, ITimelineItem[]> = {};

    // 按"YYYY年M月D日"分组
    data.forEach((item) => {
      const d = new Date(item.publishTime);
      const dateKey = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
      if (!groupMap[dateKey]) {
        groupMap[dateKey] = [];
      }
      groupMap[dateKey].push(item);
    });

    // 转换为目标结构
    const result: ITimelineGroup[] = Object.keys(groupMap).map(
      (date) =>
        ({
          date,
          records: groupMap[date].map((item) => {
            const d = new Date(item.publishTime);
            const hh = String(d.getHours()).padStart(2, "0");
            const mm = String(d.getMinutes()).padStart(2, "0");
            return {
              _id: item._id,
              time: `${hh}:${mm}`,
              tags: item.tags || [],
              content: item.content,
              files: item.files || [],
              isMilestone: item.isMilestone,
              visibleRoles: item.visibleRoles,
              comments: item.comments || [],
              userInfo: item.userInfo,
            };
          }),
        }) as any,
    );

    setTimelineList(result);
  };

  // 滚动触底加载下一页
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    if (distanceToBottom < SCROLL_THRESHOLD && hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadList(nextPage, false);
    }
  };

  return (
    <>
      <TimeLineContext.Provider value={{ refreshKey, setRefreshKey }}>
        <TimelineWrapper onScroll={handleScroll}>
          {timeLineList.length > 0 ? (
            (timeLineList as unknown as ITimelineGroup[]).map(
              (group, gIndex) => (
                <TimelineGroup key={gIndex}>
                  <DateLabel>
                    {group.date === todayKey ? "今日" : group.date}
                  </DateLabel>
                  {group.records.map((record, rIndex) => (
                    <TimeLineCard record={record} key={rIndex} />
                  ))}
                </TimelineGroup>
              ),
            )
          ) : (
            <Empty text="暂无记录" />
          )}
          {timeLineList.length > 0 && (
            <LoadMoreTip>
              {loading ? "加载中..." : hasMore ? "" : "没有更多了"}
            </LoadMoreTip>
          )}
        </TimelineWrapper>
      </TimeLineContext.Provider>
    </>
  );
}

export default TimeLineList;
