import { create } from "zustand";
// 导入类型
import type { AiState } from "../types";
// 导入接口
import { getAiChatRecordApi, getAiChatRecordDetailApi } from "@/api";

export const useAiStore = create<AiState>((set) => ({
  sessionCode: "",
  setSessionCode: (code: string) => {
    set({ sessionCode: code });
  },
  // 获取聊天记录（失败返回空分组结构，保证调用方直接取 data.list 安全）
  getAiChatRecord: async (params) => {
    const { code, data } = await getAiChatRecordApi(params);
    return code === 0 ? data : { list: {}, total: 0, page: 1, pageSize: 0 };
  },
  // 获取聊天记录详情
  getAiChatRecordDetail: async (params) => {
    const { code, data } = await getAiChatRecordDetailApi(params);
    return code === 0 ? data : { list: [] };
  },
}));
