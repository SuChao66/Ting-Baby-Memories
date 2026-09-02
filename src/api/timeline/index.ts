// 导入请求方法
import { post, get, del } from "@/api/request";
// 导入通用响应类型
import type { ApiResponse } from "@/api/request";
import type {
  ITimelineReq,
  IPagination,
  ITimelineRes,
  ICommentReq,
  IFileList,
} from "@/interface/timeline";

/** 发布记录 */
export function addTimeLineApi(
  params: ITimelineReq,
): Promise<ApiResponse<boolean>> {
  return post<boolean>("/api/v1/timeline/add", params);
}

/** 编辑记录 */
export function editTimeLineApi(
  params: ITimelineReq,
): Promise<ApiResponse<boolean>> {
  return post<boolean>("/api/v1/timeline/edit", params);
}

/** 获取记录 */
export function getTimeLineListApi(
  params: IPagination,
): Promise<ApiResponse<ITimelineRes>> {
  return post<ITimelineRes>("/api/v1/timeline/list", params);
}

/** 获取记录详情 */
export function getTimeLineInfoApi(params: { id: string }) {
  return get<any>("/api/v1/timeline/info", params);
}

/** 删除记录 */
export function deleteTimeLineApi(params: { id: string }) {
  return del<string>("/api/v1/timeline/delete", params);
}

/** 发表评论 */
export function publishCommentApi(params: ICommentReq) {
  return post<any>("/api/v1/timeline/comment", params);
}

/** 获取文件列表 */
export function getFileListApi(params: {
  babyId: string;
  type: string;
  isMonth?: boolean;
  /** 按月加载的月份，格式 YYYY-MM */
  month?: string;
}) {
  return post<IFileList>("/api/v1/timeline/fileList", params);
}
