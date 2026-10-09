import { create } from "zustand";
// 导入类型
import type { heightWeightState } from "../types";
import type {
  IAddHeightWeightParams,
  IEditHeightWeightParams,
  ISearchHeightWeightParams,
} from "@/interface/heightWeight";
// 导入接口
import {
  addHeightWeightApi,
  editHeightWeightApi,
  deleteHeightWeightApi,
  searchHeightWeightApi,
} from "@/api";

export const useHeightWeightStore = create<heightWeightState>(() => ({
  // 新增记录
  addHeightWeight: async (params: IAddHeightWeightParams) => {
    const { code } = await addHeightWeightApi(params);
    return code === 0 ? true : false;
  },
  // 编辑记录
  editHeightWeight: async (params: IEditHeightWeightParams) => {
    const { code } = await editHeightWeightApi(params);
    return code === 0 ? true : false;
  },
  // 删除记录
  deleteHeightWeight: async (id: string) => {
    const { code } = await deleteHeightWeightApi(id);
    return code === 0 ? true : false;
  },
  // 查询记录
  searchHeightWeight: async (params: ISearchHeightWeightParams) => {
    const { code, data } = await searchHeightWeightApi(params);
    return code === 0 ? data : { list: [], total: 0 };
  },
}));
