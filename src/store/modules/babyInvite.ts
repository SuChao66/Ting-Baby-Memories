import { create } from "zustand";
// 导入类型
import type { BabyInviteState } from "../types";
import type { IInviteLinkParams } from "@/interface/babyInvite";
// 导入接口
import { generateInviteLinkApi, getInviteLinkInfoApi } from "@/api";

export const useBabyInviteStore = create<BabyInviteState>(() => ({
  // 生成邀请链接
  generateInviteLink: async (params: IInviteLinkParams) => {
    const { code, data } = await generateInviteLinkApi(params);
    if (code === 0) {
      return data;
    }
  },
  // 获取邀请页信息
  getInviteLinkInfo: async (token: string) => {
    const { code, data } = await getInviteLinkInfoApi(token);
    if (code === 0) {
      return data;
    }
  },
}));
