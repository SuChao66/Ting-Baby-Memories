// 导入请求方法
import { post, get, del } from "@/api/request";
// 导入通用响应类型
import type { ApiResponse } from "@/api/request";
// 导入类型
import type { ITag } from "@/interface/tag";

/** 获取标签 */
export function getTagsApi(): Promise<ApiResponse<any>> {
  return get<ITag[]>("/api/v1/tags/list");
}

/** 新增标签 */
export function addTagApi(data: {
  name: string;
}): Promise<ApiResponse<string>> {
  return post<string>("/api/v1/tags/add", data);
}

/** 删除标签 */
export function deleteTagApi(data: {
  id: string;
}): Promise<ApiResponse<string>> {
  return del<string>("/api/v1/tags/delete", data);
}
