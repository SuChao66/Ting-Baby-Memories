// 导入请求方法
import { get, post } from "@/api/request";
// 导入通用响应类型
import type { ApiResponse } from "@/api/request";
// 导入宝宝信息类型
import type { IBabyInfo, IBabyItem } from "@/interface/baby";

/** 获取宝宝列表 */
export function getBabyListApi(): Promise<ApiResponse<IBabyItem[]>> {
  return get<IBabyItem[]>("/api/v1/baby/list");
}

/** 新增宝宝 */
export function addBabyApi(data: IBabyInfo): Promise<ApiResponse> {
  return post<IBabyInfo>("/api/v1/baby/add", data);
}

/** 获取宝宝信息 */
export function getBabyInfoApi(): Promise<ApiResponse<IBabyItem>> {
  return get<IBabyItem>("/api/v1/baby/info");
}

/** 更新宝宝信息 */
export function updateBabyInfoApi(
  data: Partial<IBabyItem>,
): Promise<ApiResponse<IBabyItem>> {
  return post<IBabyItem>("/api/v1/baby/update", data);
}
