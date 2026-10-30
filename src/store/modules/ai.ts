import { create } from "zustand";
// 导入类型
import type { AiState } from "../types";

export const useAiStore = create<AiState>((set) => ({
  sessionCode: "",
  setSessionCode: (code: string) => {
    set({ sessionCode: code });
  },
}));
