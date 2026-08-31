import type { IVisibleRoles } from "@/types";

export interface IFile {
  type: "IMAGE" | "VIDEO";
  url: string;
}

export interface ITimelineReq {
  id?: string; // timeLine id
  babyId: string;
  content: string;
  files?: IFile[];
  tags?: string[];
  publishTime: Date;
  isMilestone: boolean;
  visibleRoles: IVisibleRoles;
}

export interface IPagination {
  page: number;
  pageSize: number;
}

export interface ITimelineRes {
  total: number;
  data: ITimelineItem[];
}

export interface ITimelineItem {
  _id: string;
  userId: UserId;
  babyId: string;
  content: string;
  files: IFile[];
  tags: string[];
  isMilestone: boolean;
  publishTime: string;
  visibleRoles: string;
  comments: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  userInfo: IUserInfo;
}

export interface UserId {
  _id: string;
  nickname: string;
  avatarUrl: string;
}

export interface IUserInfo {
  _id: string;
  nickname: string;
  avatarUrl: string;
  relation: string;
}

// 分组后的记录类型
export interface ITimelineGroupRecord {
  _id: string;
  time: string;
  tags: string[];
  content: string;
  files: IFile[];
  isMilestone: boolean;
  visibleRoles: string;
  comments: any[];
  userInfo: IUserInfo;
  userId: UserId;
}

export interface ITimelineGroup {
  date: string;
  records: ITimelineGroupRecord[];
}

export interface IComment {
  releation: string;
  content: string;
}

export interface ICommentReq {
  id: string;
  comment: IComment;
}
