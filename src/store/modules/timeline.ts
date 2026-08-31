import { create } from "zustand";
// 导入类型
import type { TimelineState } from "../types";
import type {
  ITimelineReq,
  IPagination,
  ITimelineGroup,
  ICommentReq,
} from "@/interface/timeline";
// 导入接口
import {
  addTimeLineApi,
  editTimeLineApi,
  getTimeLineListApi,
  deleteTimeLineApi,
  getTimeLineInfoApi,
  publishCommentApi,
} from "@/api";

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
  // 编辑记录
  editTimeline: async (params: ITimelineReq) => {
    const { code } = await editTimeLineApi(params);
    return code === 0 ? true : false;
  },
  // 获取记录
  getTimeLineList: async (params: IPagination & { babyId: string }) => {
    const { code, data } = await getTimeLineListApi(params);
    if (code === 0) {
      return data;
    }
  },
  // 删除记录
  deleteTimeLine: async (id: string) => {
    const { code } = await deleteTimeLineApi({ id });
    return code === 0 ? true : false;
  },
  // 获取记录详情
  getTimeLineInfo: async (id: string) => {
    const { code, data } = await getTimeLineInfoApi({ id });
    if (code === 0) {
      return data;
    }
  },
  // 发布记录
  publishComment: async (params: ICommentReq) => {
    const { code } = await publishCommentApi(params);
    return code === 0 ? true : false;
  },
}));
