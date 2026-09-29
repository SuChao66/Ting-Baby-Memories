// 导入请求方法
import { post, del } from "@/api/request";
// 导入通用响应类型
import type { ApiResponse } from "@/api/request";
import type {
  IAddVaccineRecordParams,
  IEditVaccineRecordParams,
  ISearchVaccineRecordParams,
  IGetVaccineRecordListResponse,
  ISearchVaccinePlanParams,
  ISaveVaccinePlanParams,
  IGetVaccinePlanResponse,
} from "@/interface/vaccine";

/** 新增疫苗接种记录 */
export function addVaccineRecordApi(
  params: IAddVaccineRecordParams,
): Promise<ApiResponse<string>> {
  return post<string>("/api/v1/vaccine_record/add", params);
}

/** 删除疫苗接种记录 */
export function deleteVaccineRecordApi(
  id: string,
): Promise<ApiResponse<boolean>> {
  return del<boolean>("/api/v1/vaccine_record/delete", { id });
}

/** 编辑疫苗接种记录 */
export function editVaccineRecordApi(
  params: IEditVaccineRecordParams,
): Promise<ApiResponse<boolean>> {
  return post<boolean>("/api/v1/vaccine_record/edit", params);
}

/** 查询疫苗接种记录 */
export function getVaccineRecordListApi(
  params: ISearchVaccineRecordParams,
): Promise<ApiResponse<IGetVaccineRecordListResponse>> {
  return post<IGetVaccineRecordListResponse>(
    "/api/v1/vaccine_record/list",
    params,
  );
}

/** 查询疫苗接种计划 */
export function getVaccinePlanApi(
  params: ISearchVaccinePlanParams,
): Promise<ApiResponse<IGetVaccinePlanResponse>> {
  return post<IGetVaccinePlanResponse>("/api/v1/vaccine_plan/detail", params);
}

/** 保存疫苗接种计划 */
export function saveVaccinePlanApi(
  params: ISaveVaccinePlanParams,
): Promise<ApiResponse<boolean>> {
  return post<boolean>("/api/v1/vaccine_plan/save", params);
}
