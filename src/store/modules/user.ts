import { create } from "zustand";
// 导入类型
import type { UserState } from "../types";

// 创建用户状态管理模块
export const useUserStore = create<UserState>((set) => ({
  isLogin: false,
  setLoginLogin: (isLogin: boolean) => set({ isLogin }),
}));
