// 生成邀请链接入参
export interface IInviteLinkParams {
  babyId: string; // 宝宝id
  relation: string; // 关系
  expireDays: number; // 有效期
}

// 邀请页预览信息
export interface IInviteLinkPreviewInfo {
  inviterAvatarUrl: string;
  babyNickname: string;
  relation: string;
  expiresAt: string;
}
