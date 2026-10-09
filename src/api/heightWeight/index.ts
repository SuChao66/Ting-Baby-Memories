// 导入请求方法
import { post, del } from "@/api/request";
// 导入通用响应类型
import type { ApiResponse } from "@/api/request";
import type {
  IAddHeightWeightParams,
  IEditHeightWeightParams,
  ISearchHeightWeightParams,
  IHeightWeightList,
} from "@/interface/heightWeight";

/** 新增记录 */
export function addHeightWeightApi(
  params: IAddHeightWeightParams,
): Promise<ApiResponse<boolean>> {
  return post<boolean>("/api/v1/weight_height/add", params);
}

/** 删除记录 */
export function deleteHeightWeightApi(
  id: string,
): Promise<ApiResponse<boolean>> {
  return del<boolean>("/api/v1/weight_height/delete", { id });
}

/** 编辑记录 */
export function editHeightWeightApi(
  params: IEditHeightWeightParams,
): Promise<ApiResponse<boolean>> {
  return post<boolean>("/api/v1/weight_height/edit", params);
}

/** 查询记录 */
export function searchHeightWeightApi(
  params: ISearchHeightWeightParams,
): Promise<ApiResponse<IHeightWeightList>> {
  return post<any>("/api/v1/weight_height/list", params);
}
