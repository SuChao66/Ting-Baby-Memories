import type { SymptomRecordType } from "@/types";

// 新增症状护理记录
export interface IAddSymptomRecordParams {
  babyId: string;
  type: SymptomRecordType; // 记录类型
  startTime?: Date; // 记录时间
  remark?: string; // 备注
  /** 体温 */
  temperature?: number; // 体温值 ℃
  /** 症状 */
  symptoms?: string[]; // 症状列表（多选）
  /** 用药 */
  medicineType?: string; // 药品使用类型：internal-内服 / external-外用
  medicineName?: string; // 药品名称
  dosage?: string; // 用药剂量
  /** 看医生 */
  hospital?: string; // 就诊医院
  department?: string; // 就诊科室
  doctor?: string; // 就诊医生
  diagnosis?: string; // 就诊原因/诊断
  advice?: string; // 医生建议
  /** 备忘 */
  content?: string; // 备忘内容
}

// 编辑症状护理记录
export type IEditSymptomRecordParams = IAddSymptomRecordParams & { id: string };

// 查询症状护理记录（按天全量返回，无分页）
export type ISearchSymptomRecordParams = {
  babyId: string;
  date: string; // 按天查询，格式 YYYY-MM-DD
  type?: SymptomRecordType; // 可选：按类型筛选
};

// 获取症状护理记录
export interface IGetSymptomRecordListResponse {
  list: IGetSymptomRecordItem[]
  total: number
}

export interface IGetSymptomRecordItem {
  _id: string
  userId: string
  babyId: string
  type: string
  startTime: string
  remark: string
  temperature?: number
  symptoms?: string[]
  medicineType?: string
  medicineName?: string
  dosage?: string
  hospital?: string
  department?: string
  doctor?: string
  diagnosis?: string
  advice?: string
  content?: string
  createdAt: string
  updatedAt: string
  __v: number
}
