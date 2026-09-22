import { create } from "zustand";
// 导入类型
import type { DailyRecordState } from "../types";
import type {
  IAddDailyRecordParams,
  IEditDailyRecordParams,
  ISearchDailyRecordParams,
} from "@/interface/dailyRecord";
// 导入接口
import {
  addDailyRecordApi,
  deleteDailyRecordApi,
  editDailyRecordApi,
  searchDailyRecordApi,
} from "@/api";

export const useDailyRecordStore = create<DailyRecordState>(() => ({
  // 新增记录
  addDailyRecord: async (params: IAddDailyRecordParams) => {
    const { code } = await addDailyRecordApi(params);
    return code === 0 ? true : false;
  },
  // 编辑记录
  editDailyRecord: async (params: IEditDailyRecordParams) => {
    const { code } = await editDailyRecordApi(params);
    return code === 0 ? true : false;
  },
  // 删除记录
  deleteDailyRecord: async (id: string) => {
    const { code } = await deleteDailyRecordApi(id);
    return code === 0 ? true : false;
  },
  // 查询记录
  searchDailyRecord: async (params: ISearchDailyRecordParams) => {
    const { code, data } = await searchDailyRecordApi(params);
    return code === 0 ? data : { list: [], total: 0 };
  },
}));
