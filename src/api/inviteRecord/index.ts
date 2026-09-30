// 导入请求方法
import { post } from "../request";
// 导入通用响应类型
import type { ApiResponse } from "@/api/request";
// 导入类型
import type { IInviteLinkParams } from "@/interface/inviteRecord";

/** 生成邀请链接 */
export function generateInviteLinkApi(
  params: IInviteLinkParams,
): Promise<ApiResponse<string>> {
  return post<string>("/api/v1/invite/create_invite_link", params);
}
