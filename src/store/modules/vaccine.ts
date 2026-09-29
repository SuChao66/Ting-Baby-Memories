import { create } from "zustand";
// 导入类型
import type { VaccineState } from "../types";
// 导入接口
import {
  addVaccineRecordApi,
  deleteVaccineRecordApi,
  editVaccineRecordApi,
  getVaccineRecordListApi,
  getVaccinePlanApi,
  saveVaccinePlanApi,
} from "@/api";

export const useVaccineStore = create<VaccineState>(() => ({
  // 新增接种记录
  addVaccineRecord: async (params) => {
    const { code } = await addVaccineRecordApi(params);
    return code === 0 ? true : false;
  },
  // 编辑接种记录
  editVaccineRecord: async (params) => {
    const { code } = await editVaccineRecordApi(params);
    return code === 0 ? true : false;
  },
  // 删除接种记录
  deleteVaccineRecord: async (id: string) => {
    const { code } = await deleteVaccineRecordApi(id);
    return code === 0 ? true : false;
  },
  // 查询接种记录
  searchVaccineRecord: async (params) => {
    const { code, data } = await getVaccineRecordListApi(params);
    return code === 0 ? data : { list: [], total: 0 };
  },
  // 查询接种计划
  getVaccinePlan: async (params) => {
    const { code, data } = await getVaccinePlanApi(params);
    return code === 0 ? data : { keys: [] };
  },
  // 保存接种计划
  saveVaccinePlan: async (params) => {
    const { code } = await saveVaccinePlanApi(params);
    return code === 0 ? true : false;
  },
}));
