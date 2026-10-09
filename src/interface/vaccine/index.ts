// 新增疫苗接种记录
export interface IAddVaccineRecordParams {
  babyId: string;
  /** 关联剂次标识（如 "hepb-1"），自由补录时为空 */
  doseKey?: string;
  /** 疫苗名称（冗余存储，不依赖模板） */
  vaccineName: string;
  /** 第几剂 */
  dose?: number;
  /** 实际接种日期 YYYY-MM-DD */
  injectDate: string;
  /** 接种单位 */
  hospital?: string;
  /** 疫苗批号 */
  batchNo?: string;
  /** 费用（元），自费时有意义 */
  fee?: number;
  /** 备注 */
  note?: string;
}

// 编辑疫苗接种记录
export type IEditVaccineRecordParams = IAddVaccineRecordParams & { id: string };

// 查询疫苗接种记录（按宝宝全量返回，无分页）
export interface ISearchVaccineRecordParams {
  babyId: string;
}

// 疫苗接种记录（后端返回结构）
export interface IVaccineRecordResponseItem {
  _id: string;
  userId: string;
  babyId: string;
  doseKey?: string;
  vaccineName: string;
  dose?: number;
  injectDate: string;
  hospital?: string;
  batchNo?: string;
  fee?: number;
  note?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// 获取疫苗接种记录列表
export interface IGetVaccineRecordListResponse {
  list: IVaccineRecordResponseItem[];
  total: number;
}

// 查询疫苗接种计划
export interface ISearchVaccinePlanParams {
  babyId: string;
}

// 保存疫苗接种计划（整份覆盖）
export interface ISaveVaccinePlanParams {
  babyId: string;
  /** 已加入计划的自费疫苗剂次 key 集合 */
  keys: string[];
}

// 获取疫苗接种计划
export interface IGetVaccinePlanResponse {
  keys: string[];
}
