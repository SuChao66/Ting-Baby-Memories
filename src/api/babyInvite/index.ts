// 导入请求方法
import { post, get } from "../request";
// 导入通用响应类型
import type { ApiResponse } from "@/api/request";
// 导入类型
import type {
  IInviteLinkParams,
  IInviteLinkPreviewInfo,
} from "@/interface/babyInvite";

/** 生成邀请链接 */
export function generateInviteLinkApi(
  params: IInviteLinkParams,
): Promise<ApiResponse<string>> {
  return post<string>("/api/v1/invite/create_invite_link", params);
}

/** 获取邀请信息 */
export function getInviteLinkInfoApi(
  token: string,
): Promise<ApiResponse<IInviteLinkPreviewInfo>> {
  return get<IInviteLinkPreviewInfo>("/api/v1/invite/get_preview_info", {
    token,
  });
}
