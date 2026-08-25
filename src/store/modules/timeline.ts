import { create } from "zustand";
// 导入类型
import type { TimelineState } from "../types";
import type {
  ITimelineReq,
  IPagination,
  ITimelineGroup,
} from "@/interface/timeline";
// 导入接口
import { addTimeLineApi, getTimeLineListApi } from "@/api";

export const useTimelineStore = create<TimelineState>((set) => ({
  timeLineList: [],
  setTimelineList: (list: ITimelineGroup[]) => {
    set({ timeLineList: list });
  },
  // 新增记录
  addTimeline: async (params: ITimelineReq) => {
    const { code } = await addTimeLineApi(params);
    return code === 0 ? true : false;
  },
  // 获取记录
  getTimeLineList: async (params: IPagination & { babyId: string }) => {
    const { code, data } = await getTimeLineListApi(params);
    if (code === 0) {
      return data;
    }
  },
}));
