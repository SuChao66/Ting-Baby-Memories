import { create } from "zustand";
// 导入类型
import type { FutureMessageState } from "../types";
import type { IPagination } from "@/interface/common";
import type { addFutureMessageReq } from "@/interface/futureMessage";
// 导入接口
import {
  addFutureMessageApi,
  getFutureMessageListApi,
  updateFutureMessageApi,
  deleteFutureMessageApi,
} from "@/api";

export const useFutureMessageStore = create<FutureMessageState>(() => ({
  // 获取未来寄语列表
  getFutureMessageList: async (params: IPagination & { babyId: string }) => {
    const { code, data } = await getFutureMessageListApi(params);
    if (code === 0) {
      return data;
    }
  },
  // 添加未来寄语
  addFutureMessage: async (params: addFutureMessageReq) => {
    const { code } = await addFutureMessageApi(params);
    return code === 0 ? true : false;
  },
  // 更新未来寄语
  updateFutureMessage: async (params: addFutureMessageReq) => {
    const { code } = await updateFutureMessageApi(params);
    return code === 0 ? true : false;
  },
  // 删除未来寄语
  deleteFutureMessage: async (id: string) => {
    const { code } = await deleteFutureMessageApi(id);
    return code === 0 ? true : false;
  },
}));
