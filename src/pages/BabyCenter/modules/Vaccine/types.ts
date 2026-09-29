/** 疫苗规划类型：免费（免疫规划）/ 自费（非免疫规划） */
export type VaccinePlan = "free" | "paid";

/** 剂次接种状态 */
export type DoseStatus = "done" | "overdue" | "due" | "future";

/** 页签 key */
export type VaccineTabKey = "free" | "paid";

/** 排期模板剂次（静态只读数据） */
export interface IVaccineDose {
  /** 剂次唯一标识，如 "hepb-1" */
  key: string;
  /** 归属疫苗标识（自费疫苗库分组用），如 "hepb" */
  vaccineKey: string;
  /** 疫苗名称 */
  vaccineName: string;
  /** 第几剂 */
  dose: number;
  /** 共几剂 */
  totalDose: number;
  /** 推荐接种月龄（月） */
  recommendAge: number;
  /** 展示用月龄文案，如 "出生时" / "6月龄" / "4岁" */
  ageLabel: string;
  /** 免费或自费 */
  plan: VaccinePlan;
  /** 预防疾病 */
  disease: string;
  /** 补充说明（自费疫苗常用） */
  intro?: string;
}

/** 接种记录（与后端 vaccineRecord 集合字段对齐，id 为记录 _id） */
export interface IVaccineRecordItem {
  /** 记录 id */
  id: string;
  /** 关联剂次标识；自由补录时为空 */
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

/** 派生：带状态与记录的剂次 */
export interface IDoseWithStatus extends IVaccineDose {
  status: DoseStatus;
  record?: IVaccineRecordItem;
}

/** 派生：按推荐月龄分组 */
export interface IAgeGroup {
  ageLabel: string;
  recommendAge: number;
  doses: IDoseWithStatus[];
}

/** 自费疫苗汇总（疫苗库卡片展示用，从剂次数据派生） */
export interface IPaidVaccineSummary {
  vaccineKey: string;
  vaccineName: string;
  disease: string;
  totalDose: number;
  startAge: number;
  startAgeLabel: string;
  intro?: string;
}
