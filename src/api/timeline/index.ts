// 导入请求方法
import { get, post, del } from "@/api/request";
// 导入通用响应类型
import type { ApiResponse } from "@/api/request";
// 导入时间线项类型
import type { TimelineItem } from "@/interface/timeline";

/** 获取时间线列表 */
export function getTimelineList(): Promise<ApiResponse<TimelineItem[]>> {
  return get<TimelineItem[]>("/timeline/list");
}

/** 新增时间线项 */
export function addTimelineItem(
  data: Omit<TimelineItem, "id">,
): Promise<ApiResponse<TimelineItem>> {
  return post<TimelineItem>("/timeline", data);
}

/** 删除时间线项 */
export function deleteTimelineItem(id: string): Promise<ApiResponse<null>> {
  return del<null>(`/timeline/${id}`);
}
