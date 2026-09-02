import { create } from "zustand";
// 导入类型
import type { FamilyState } from "../types";
// 导入接口
import { getFamilyListApi, recordVisitApi } from "@/api/family";

export const useFamilyStore = create<FamilyState>((set) => ({
  familyList: [],
  // 获取家庭成员列表
  getFamilyList: async (babyId: string) => {
    const { code, data } = await getFamilyListApi({ babyId });
    if (code === 0) {
      set({ familyList: data || [] });
    }
  },
  // 记录访问
  recordVisit: async (babyId: string) => {
    await recordVisitApi({ babyId });
  },
}));
