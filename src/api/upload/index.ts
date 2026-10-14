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

/**
 * 直传文件到 COS（预签名 PUT）
 * fetch 拿不到上传进度，改用 XHR，通过 onProgress 上报 0-100 进度
 */
export function uploadFileToCos(
  uploadUrl: string,
  file: File,
  onProgress?: (percent: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.setRequestHeader("x-cos-acl", "public-read");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error("上传失败"));
    };
    xhr.onerror = () => reject(new Error("上传失败"));
    xhr.send(file);
  });
}
