// 导入请求方法
import { get, put } from "@/api/request";
// 导入通用响应类型
import type { ApiResponse } from "@/api/request";
// 导入宝宝信息类型
import type { BabyInfo } from "@/interface/baby";

/** 获取宝宝信息 */
export function getBabyInfo(): Promise<ApiResponse<BabyInfo>> {
  return get<BabyInfo>("/baby/info");
}

/** 更新宝宝信息 */
export function updateBabyInfo(
  data: Partial<BabyInfo>,
): Promise<ApiResponse<BabyInfo>> {
  return put<BabyInfo>("/baby/info", data);
}
