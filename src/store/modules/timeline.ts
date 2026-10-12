import { create } from "zustand";
// 导入类型
import type { TimelineState } from "../types";
import type { TimelineViewType } from "@/types";
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
  getFileListApi,
  toggleLikeApi,
  getAllTimeLineListApi,
} from "@/api";
// 导入常量
import { TIME_LIME_VIEW_MODE } from "@/enums";

export const useTimelineStore = create<TimelineState>((set) => ({
  viewMode: TIME_LIME_VIEW_MODE.LIST,
  timeLineList: [],
  // 设置视图模式
  setViewMode: (mode: TimelineViewType) => {
    set({ viewMode: mode });
  },
  // 设置记录列表
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
  getTimeLineList: async (
    params: IPagination & { babyId: string; isMilestone?: boolean },
  ) => {
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
  // 点赞/取消点赞（用接口返回的最新点赞列表本地同步更新，避免整页刷新）
  toggleLike: async (id: string) => {
    const { code, data } = await toggleLikeApi({ id });
    if (code !== 0) return null;
    set((state) => ({
      timeLineList: state.timeLineList.map((group) => ({
        ...group,
        records: group.records.map((record) =>
          record._id === id ? { ...record, likes: data.likes || [] } : record,
        ),
      })),
    }));
    return data;
  },
  // 获取文件列表
  getFileList: async (
    babyId: string,
    type: string,
    isMonth?: boolean,
    month?: string,
  ) => {
    const { code, data } = await getFileListApi({
      babyId,
      type,
      isMonth: isMonth || false,
      month,
    });
    return code === 0 ? data : {};
  },
  // 获取全部记录
  getAllTimeLineList: async (params: { babyId: string }) => {
    const { code, data } = await getAllTimeLineListApi(params);
    return code === 0 ? data : null;
  },
}));
