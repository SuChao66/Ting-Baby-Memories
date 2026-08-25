import type { IVisibleRoles } from "@/types";

export interface IFile {
  type: "IMAGE" | "VIDEO";
  url: string;
}

export interface ITimelineReq {
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
  userId: string;
  babyId: string;
  content: string;
  files: any[];
  tags: string[];
  isMilestone: boolean;
  publishTime: string;
  visibleRoles: string;
  comments: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// 分组后的记录类型
export interface ITimelineGroup {
  date: string;
  records: {
    time: string;
    tags: string[];
    content: string;
    files: IFile[];
    isMilestone: boolean;
    visibleRoles: string;
    comments: any[];
  }[];
}
