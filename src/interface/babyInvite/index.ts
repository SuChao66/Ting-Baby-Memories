// 生成邀请链接入参
export interface IInviteLinkParams {
  babyId: string; // 宝宝id
  relation: string; // 关系
  expireDays: number; // 有效期
}

// 邀请页预览信息
export interface IInviteLinkPreviewInfo {
  inviterAvatarUrl: string;
  babyId: string;
  babyNickname: string;
  relation: string;
  expiresAt: string;
}

// 接受邀请入参
export interface IAcceptInviteParams {
  nickname: string;
  relation: string;
  babyId: string;
  token: string;
}
