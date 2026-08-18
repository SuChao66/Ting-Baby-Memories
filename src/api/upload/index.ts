// 导入请求方法
import { post } from "@/api/request";
// 导入通用响应类型
import type { ApiResponse } from "@/api/request";
// 导入预签名上传响应类型
import type { PresignedUpload } from "@/interface/upload";

/** 获取预签名上传地址 */
export function getPresignedUrlApi(data: {
  filename: string;
  contentType: string;
}): Promise<ApiResponse<PresignedUpload>> {
  return post<PresignedUpload>("/api/v1/upload/presigned", data);
}
