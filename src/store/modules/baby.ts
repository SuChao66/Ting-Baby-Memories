import { create } from "zustand";
// 导入类型
import type { BabyState } from "../types";
import type { IBabyInfo } from "@/interface/baby";
// 导入接口
import {
  hasBabyAPi,
  getBabyListApi,
  addBabyApi,
  getBabyInfoApi,
  updateBabyInfoApi,
  deleteBabyApi,
} from "@/api";

export const useBabyStore = create<BabyState>((set, get) => ({
  babyId: "",
  setBabyId: (id: string) => {
    set({ babyId: id });
  },
  // 是否添加了宝宝
  hasBaby: async () => {
    const { data } = await hasBabyAPi();
    return data;
  },
  // 获取宝宝列表
  getBabyList: async () => {
    const { code, data } = await getBabyListApi();
    if (code === 0) {
      // 默认选择第一个宝宝
      const defaultBabyId = data[0]._id;
      get().setBabyId(defaultBabyId);
      return data;
    }
  },
  // 新增宝宝信息
  addBaby: async (babyForm: IBabyInfo) => {
    const { code } = await addBabyApi(babyForm);
    return code === 0 ? true : false;
  },
  // 获取宝宝信息
  getBabyInfo: async (params: { id: string }) => {
    const { code, data } = await getBabyInfoApi(params);
    if (code === 0) {
      return data;
    }
  },
  // 更新宝宝信息
  updateBabyInfo: async (data: Partial<IBabyInfo> & { id: string }) => {
    const { code } = await updateBabyInfoApi(data);
    return code === 0 ? true : false;
  },
  // 删除宝宝档案
  deleteBaby: async (params: { id: string }) => {
    const { code } = await deleteBabyApi(params);
    return code === 0 ? true : false;
  },
}));
