// 导入请求方法
import { post, del } from "@/api/request";
// 导入通用响应类型
import type { ApiResponse } from "@/api/request";
import type {
  IAddSymptomRecordParams,
  IEditSymptomRecordParams,
  ISearchSymptomRecordParams,
  IGetSymptomRecordListResponse,
} from "@/interface/symptom";

/** 新增症状护理记录 */
export function addSymptomRecordApi(
  params: IAddSymptomRecordParams,
): Promise<ApiResponse<boolean>> {
  return post<boolean>("/api/v1/symptom_record/add", params);
}

/** 删除症状护理记录 */
export function deleteSymptomRecordApi(
  id: string,
): Promise<ApiResponse<boolean>> {
  return del<boolean>("/api/v1/symptom_record/delete", { id });
}

/** 编辑症状护理记录 */
export function editSymptomRecordApi(
  params: IEditSymptomRecordParams,
): Promise<ApiResponse<boolean>> {
  return post<boolean>("/api/v1/symptom_record/edit", params);
}

/** 查询症状护理记录 */
export function searchSymptomRecordApi(
  params: ISearchSymptomRecordParams,
): Promise<ApiResponse<any>> {
  return post<IGetSymptomRecordListResponse>(
    "/api/v1/symptom_record/list",
    params,
  );
}
