import type { IFile } from "@/interface/timeline";
import type { IVisibleRoles } from "@/types";

export interface addFutureMessageReq {
  id?: string; // 未来寄语ID
  babyId: string; // 宝宝ID
  revealDate: Date; // 解锁日期
  content: string; // 未来寄语内容
  files?: IFile[]; // 未来寄语文件
  visibleRoles: IVisibleRoles; // 可见角色
}

export interface IFutureMessageList {
  total: number;
  list: IFutureMessage[];
}

export interface IFutureMessage {
  _id: string;
  userId: UserId;
  userInfo: UserInfo;
  babyId: string;
  content: string;
  revealDate: string;
  files: File[];
  visibleRoles: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserId {
  _id: string;
  nickname: string;
  avatarUrl: string;
}

export interface UserInfo {
  _id: string;
  nickname: string;
  avatarUrl: string;
  relation: string;
}

export interface File {
  url: string;
  type: string;
  fileName: string;
  _id: string;
}
