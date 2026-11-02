/** AI 对话历史消息 */
export interface IAiChatMessage {
  role: "user" | "assistant";
  content: string;
}

/** AI 场景取值（帮我写记录 / 成长周报 / 健康数据解读） */
export type AiScene = NonNullable<IAiChatParams["scene"]>;

/** AI 对话请求参数 */
export interface IAiChatParams {
  /** 用户问题（1-1000 字） */
  question: string;
  /** sessionCode */
  sessionCode: string;
  /** reqId */
  reqId: string;
  /** AI 场景：帮我写记录 / 成长周报 / 健康数据解读，不传走通用育儿助手 */
  scene?: "record" | "weekly" | "insight";
  /** 宝宝月龄（如 "6个月"），帮助模型给出月龄匹配的建议 */
  babyAge?: string;
  /** 多轮对话历史（最多 20 条） */
  history?: IAiChatMessage[];
}

/** AI 对话响应数据 */
export interface IAiChatResult {
  /** AI 回答全文 */
  answer: string;
}

/** 会话列表 */
export interface ISessionList {
  list: List;
  total: number;
  page: number;
  pageSize: number;
}

export interface List {
  [key: string]: IsessionItem[];
}

export interface IsessionItem {
  sessionCode: string;
  question: string;
  chatCount: number;
  time: string;
}

/** 会话问答明细单项 */
export interface ISessionRecordItem {
  _id: string;
  question: string;
  answer: string;
  /** 1-成功 0-失败 */
  status: number;
  createdAt: string;
  time: string;
}

/** 会话问答明细 */
export interface ISessionRecordList {
  list: ISessionRecordItem[];
  total: number;
  page: number;
  pageSize: number;
}
