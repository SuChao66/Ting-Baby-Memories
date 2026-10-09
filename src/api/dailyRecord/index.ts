// 导入请求方法
import { post, del } from "@/api/request";
// 导入通用响应类型
import type { ApiResponse } from "@/api/request";
import type {
  IAddDailyRecordParams,
  IEditDailyRecordParams,
  ISearchDailyRecordParams,
  IGetDailyRecordListResponse
} from "@/interface/dailyRecord";

/** 新增记录 */
export function addDailyRecordApi(
  params: IAddDailyRecordParams,
): Promise<ApiResponse<boolean>> {
  return post<boolean>("/api/v1/daily_record/add", params);
}

/** 删除记录 */
export function deleteDailyRecordApi(
  id: string,
): Promise<ApiResponse<boolean>> {
  return del<boolean>("/api/v1/daily_record/delete", { id });
}

/** 编辑记录 */
export function editDailyRecordApi(
  params: IEditDailyRecordParams,
): Promise<ApiResponse<boolean>> {
  return post<boolean>("/api/v1/daily_record/edit", params);
}

/** 查询记录 */
export function searchDailyRecordApi(
  params: ISearchDailyRecordParams,
): Promise<ApiResponse<any>> {
  return post<IGetDailyRecordListResponse>("/api/v1/daily_record/list", params);
}
