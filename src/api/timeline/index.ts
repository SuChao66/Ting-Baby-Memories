// 导入请求方法
import { post } from "@/api/request";
// 导入通用响应类型
import type { ApiResponse } from "@/api/request";
import type {
  ITimelineReq,
  IPagination,
  ITimelineRes,
} from "@/interface/timeline";

/** 发布记录 */
export function addTimeLineApi(
  params: ITimelineReq,
): Promise<ApiResponse<boolean>> {
  return post<boolean>("/api/v1/timeline/add", params);
}

/** 获取记录 */
export function getTimeLineListApi(
  params: IPagination,
): Promise<ApiResponse<ITimelineRes>> {
  return post<ITimelineRes>("/api/v1/timeline/list", params);
}
