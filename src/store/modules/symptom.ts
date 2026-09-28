import { create } from "zustand";
// 导入类型
import type { SymptomState } from "../types";
import type {
  IAddSymptomRecordParams,
  IEditSymptomRecordParams,
  ISearchSymptomRecordParams,
} from "@/interface/symptom";
// 导入接口
import {
  addSymptomRecordApi,
  deleteSymptomRecordApi,
  editSymptomRecordApi,
  searchSymptomRecordApi,
} from "@/api";

export const useSymptomStore = create<SymptomState>(() => ({
  // 新增记录
  addSymptomRecord: async (params: IAddSymptomRecordParams) => {
    const { code } = await addSymptomRecordApi(params);
    return code === 0 ? true : false;
  },
  // 编辑记录
  editSymptomRecord: async (params: IEditSymptomRecordParams) => {
    const { code } = await editSymptomRecordApi(params);
    return code === 0 ? true : false;
  },
  // 删除记录
  deleteSymptomRecord: async (id: string) => {
    const { code } = await deleteSymptomRecordApi(id);
    return code === 0 ? true : false;
  },
  // 查询记录
  searchSymptomRecord: async (params: ISearchSymptomRecordParams) => {
    const { code, data } = await searchSymptomRecordApi(params);
    return code === 0 ? data : { list: [], total: 0 };
  },
}));
