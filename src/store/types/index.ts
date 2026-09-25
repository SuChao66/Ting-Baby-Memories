import type { User, ChangePasswordRequest } from "@/interface/user";
import type { IBabyInfo, IBabyItem } from "@/interface/baby";
import type { ITag } from "@/interface/tag";
import type {
  ITimelineReq,
  ITimelineRes,
  ITimelineGroup,
  ITimelineItem,
  ICommentReq,
  IFileList,
} from "@/interface/timeline";
import type { IPagination } from "@/interface/common";
import type {
  addFutureMessageReq,
  IFutureMessageList,
} from "@/interface/futureMessage";
import type {
  IAddDailyRecordParams,
  IEditDailyRecordParams,
  ISearchDailyRecordParams,
} from "@/interface/dailyRecord";
import type {
  IAddHeightWeightParams,
  IEditHeightWeightParams,
  ISearchHeightWeightParams,
} from "@/interface/heightWeight";

// 定义用户状态类型
export interface UserState {
  isLogin: boolean; // 是否登录
  token: string | null; // 登录凭证
  userInfo: User | null; // 用户信息
  login: (username: string, password: string) => Promise<boolean>; // 登录
  register: (
    username: string,
    password: string,
    confirmPassword: string,
  ) => Promise<boolean>; // 注册
  forgetPassword: (
    username: string,
    password: string,
    confirmPassword: string,
  ) => Promise<boolean>; // 忘记密码
  changePassword: (data: ChangePasswordRequest) => Promise<boolean>;
  logout: () => void; // 退出登录
  getUserInfo: () => void; // 获取用户信息
  updateUserInfo: (data: {
    id: string;
    nickname?: string;
    gender?: number;
    phone?: string;
    birthday?: string;
    avatarUrl?: string;
  }) => Promise<boolean>; // 更新用户信息
}

// 定义宝宝状态类型
export interface BabyState {
  babyId: string;
  setBabyId: (id: string) => void;
  hasBaby: () => Promise<boolean>;
  getBabyList: () => Promise<IBabyItem[]>;
  addBaby: (data: IBabyInfo) => Promise<boolean>;
  getBabyInfo: (data: { id: string }) => Promise<IBabyItem | undefined>;
  updateBabyInfo: (
    data: Partial<IBabyInfo> & { id: string },
  ) => Promise<boolean>;
  deleteBaby: (data: { id: string }) => Promise<boolean>;
  bindBaby: (data: {
    baby_no: string;
    relation: IBabyInfo["relation"];
  }) => Promise<boolean>;
}

// 定义标签状态类型
export interface TagsState {
  tags: ITag[];
  selectedTags: Array<string>;
  setSelectedTags: (tags: Array<string>) => void;
  getTags: () => Promise<boolean>;
  deleteTag: (id: string) => Promise<boolean>;
  addTag: (name: string) => Promise<boolean>;
}

// 定义记录状态类型
export interface TimelineState {
  timeLineList: ITimelineGroup[];
  setTimelineList: (item: ITimelineGroup[]) => void;
  addTimeline: (params: ITimelineReq) => Promise<boolean>;
  editTimeline: (params: ITimelineReq) => Promise<boolean>;
  getTimeLineList: (
    params: IPagination & { babyId: string; isMilestone?: boolean },
  ) => Promise<ITimelineRes | undefined>;
  deleteTimeLine: (id: string) => Promise<boolean>;
  getTimeLineInfo: (id: string) => Promise<ITimelineItem>;
  publishComment: (params: ICommentReq) => Promise<boolean>;
  getFileList: (
    babyId: string,
    type: string,
    isMonth?: boolean,
    month?: string,
  ) => Promise<IFileList>;
}

// 定义家庭成员状态类型
export interface FamilyState {
  familyList: any[];
  getFamilyList: (babyId: string) => void;
  recordVisit: (babyId: string) => void;
}

// 定义未来寄语状态类型
export interface FutureMessageState {
  getFutureMessageList: (
    params: IPagination & { babyId: string; isUnlock?: boolean },
  ) => Promise<IFutureMessageList>;
  addFutureMessage: (params: addFutureMessageReq) => Promise<boolean>;
  updateFutureMessage: (params: addFutureMessageReq) => Promise<boolean>;
  deleteFutureMessage: (id: string) => Promise<boolean>;
  getUnlockCount: (params: { babyId: string }) => Promise<number>;
  markFutureMessageRead: (params: {
    babyId: string;
    messageIds: string[];
  }) => Promise<boolean>;
}

// 定义吃喝拉撒睡状态类型
export interface DailyRecordState {
  addDailyRecord: (params: IAddDailyRecordParams) => Promise<boolean>;
  editDailyRecord: (params: IEditDailyRecordParams) => Promise<boolean>;
  deleteDailyRecord: (id: string) => Promise<boolean>;
  searchDailyRecord: (params: ISearchDailyRecordParams) => Promise<any>;
}

// 定义体重身高状态类型
export interface heightWeightState {
  addHeightWeight: (params: IAddHeightWeightParams) => Promise<boolean>;
  editHeightWeight: (params: IEditHeightWeightParams) => Promise<boolean>;
  deleteHeightWeight: (id: string) => Promise<boolean>;
  searchHeightWeight: (params: ISearchHeightWeightParams) => Promise<any>;
}
