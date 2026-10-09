import { post, del, get } from "../request";
// 导入类型
import type { IPagination } from "@/interface/timeline";
import type {
  addFutureMessageReq,
  IFutureMessageList,
} from "@/interface/futureMessage";

// 获取未来寄语列表
export const getFutureMessageListApi = (
  params: IPagination & { babyId: string; isUnlock?: boolean },
) => {
  return post<IFutureMessageList>("/api/v1/future-message/list", params);
};

// 新增未来寄语
export const addFutureMessageApi = (data: addFutureMessageReq) => {
  return post<string>("/api/v1/future-message/add", data);
};

// 更新未来寄语
export const updateFutureMessageApi = (data: addFutureMessageReq) => {
  return post<string>("/api/v1/future-message/update", data);
};

// 删除未来寄语
export const deleteFutureMessageApi = (id: string) => {
  return del<string>("/api/v1/future-message/delete", { id });
};

// 获取已解锁的信件数量
export const getUnlockCountApi = (params: { babyId: string }) => {
  return get<number>("/api/v1/future-message/unlock-count", params);
};

// 标记未来寄语为已读
export const markFutureMessageReadApi = (data: {
  babyId: string;
  messageIds: string[];
}) => {
  return post<string>("/api/v1/future-message/read", data);
};
