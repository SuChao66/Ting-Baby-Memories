import { useState, useEffect } from "react";
// 导入样式
import { TimelineWrapper, TimelineGroup, DateLabel } from "./styles";
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

function TimeLineList(props: { id: string }) {
  const { id } = props;
  const [pagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const [, setTotal] = useState(0);
  // 刷新获取记录列表
  const [refreshKey, setRefreshKey] = useState(0);
  // 今天日期
  const { year, month, day } = getTodayDate();
  const todayKey = `${year}年${month}月${day}日`;
  const { timeLineList, getTimeLineList, setTimelineList } = useTimelineStore(
    (state) => state,
  );

  useEffect(() => {
    getTimeLineLists();
  }, [refreshKey]);

  // 获取列表
  const getTimeLineLists = async () => {
    const params = {
      babyId: id,
      page: pagination.page,
      pageSize: pagination.pageSize,
    };
    const res = await getTimeLineList(params);
    setTotal(res.total);
    handleData(res.data);
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

  return (
    <>
      <TimeLineContext.Provider value={{ refreshKey, setRefreshKey }}>
        <TimelineWrapper>
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
        </TimelineWrapper>
      </TimeLineContext.Provider>
    </>
  );
}

export default TimeLineList;
