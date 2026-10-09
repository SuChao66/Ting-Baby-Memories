/** 新增身高体重记录参数（TODO: 接口参数定义可按后端要求调整） */
export interface IAddHeightWeightParams {
  /** 宝宝id */
  babyId: string;
  /** 记录日期（本地时区 YYYY-MM-DD 格式字符串，避免 toISOString 转 UTC 导致日期偏移） */
  date: string;
  /** 身高（cm） */
  height?: number;
  /** 体重（kg） */
  weight?: number;
  /** 头围（cm） */
  head?: number;
}

// 编辑日常记录
export type IEditHeightWeightParams = IAddHeightWeightParams & { id: string };

// 查询日常记录（按天全量返回，无分页）
export type ISearchHeightWeightParams = {
  babyId: string;
};

// 记录列表
export interface IHeightWeightList {
  list: IHeightWeightItem[];
  total: number;
}

export interface IHeightWeightItem {
  _id: string;
  userId: string;
  babyId: string;
  height: number;
  weight: number;
  /** 头围（cm） */
  head?: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
