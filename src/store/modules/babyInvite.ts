import { create } from "zustand";
// 导入类型
import type { BabyInviteState } from "../types";
import type { IInviteLinkParams } from "@/interface/inviteRecord";
// 导入接口
import { generateInviteLinkApi } from "@/api";

export const useBabyInviteStore = create<BabyInviteState>(() => ({
  // 生成邀请链接
  generateInviteLink: async (params: IInviteLinkParams) => {
    const { code, data } = await generateInviteLinkApi(params);
    if (code === 0) {
      return data;
    }
  },
}));
