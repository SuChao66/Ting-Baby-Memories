import { create } from "zustand";
// 导入类型
import type { BabyState } from "./types";

export const useBabyStore = create<BabyState>((set) => ({
  name: "汀宝宝",
  birthday: "",
  setName: (name) => set({ name }),
  setBirthday: (birthday) => set({ birthday }),
}));
