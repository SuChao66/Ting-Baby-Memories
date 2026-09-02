// 导入请求方法
import { get, post, del } from "@/api/request";
// 导入通用响应类型
import type { ApiResponse } from "@/api/request";
// 导入宝宝信息类型
import type { IBabyInfo, IBabyItem } from "@/interface/baby";

/** 是否添加了宝宝 */
export function hasBabyAPi(): Promise<ApiResponse<boolean>> {
  return get<boolean>("/api/v1/baby/is_add_baby");
}

/** 获取宝宝列表 */
export function getBabyListApi(): Promise<ApiResponse<IBabyItem[]>> {
  return get<IBabyItem[]>("/api/v1/baby/list");
}

/** 新增宝宝 */
export function addBabyApi(data: IBabyInfo): Promise<ApiResponse> {
  return post<IBabyInfo>("/api/v1/baby/add", data);
}

/** 获取宝宝信息 */
export function getBabyInfoApi(params: {
  id: string;
}): Promise<ApiResponse<IBabyItem>> {
  return get<IBabyItem>("/api/v1/baby/info", params);
}

/** 更新宝宝信息 */
export function updateBabyInfoApi(
  data: Partial<IBabyInfo> & { id: string },
): Promise<ApiResponse<IBabyItem>> {
  return post<IBabyItem>("/api/v1/baby/update", data);
}

/** 删除宝宝档案 */
export function deleteBabyApi(params: { id: string }): Promise<ApiResponse> {
  return del("/api/v1/baby/delete", params);
}

/** 关联宝宝 */
export function bindBabyApi(data: {
  baby_no: string;
  relation: IBabyInfo["relation"];
}): Promise<ApiResponse> {
  return post("/api/v1/baby/bind", data);
}
