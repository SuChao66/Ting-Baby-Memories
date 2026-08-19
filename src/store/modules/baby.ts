import { create } from "zustand";
// 导入类型
import type { BabyState } from "../types";
import type { IBabyInfo } from "@/interface/baby";
// 导入接口
import { getBabyListApi, addBabyApi } from "@/api";

export const useBabyStore = create<BabyState>(() => ({
  // 获取宝宝列表
  getBabyList: async () => {
    const { code, data } = await getBabyListApi();
    if (code === 0) {
      return data;
    }
  },
  // 新增宝宝信息
  addBaby: async (babyForm: IBabyInfo) => {
    const { code } = await addBabyApi(babyForm);
    return code === 0 ? true : false;
  },
}));
