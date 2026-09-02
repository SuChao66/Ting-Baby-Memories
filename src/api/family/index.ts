// 导入请求方法
import { get, post } from "@/api/request";
// 导入通用响应类型
import type { ApiResponse } from "@/api/request";

// 获取亲友列表
export function getFamilyListApi(params: {
  babyId: string;
}): Promise<ApiResponse<any[]>> {
  return get<any[]>("/api/v1/family/list", params);
}

// 记录访问
export function recordVisitApi(params: {
  babyId: string;
}): Promise<ApiResponse<any>> {
  return post<any>("/api/v1/family/visit", params);
}
