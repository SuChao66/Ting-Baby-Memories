import type { User } from "@/interface/user";
import type { IBabyInfo, IBabyItem } from "@/interface/baby";

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
  getBabyList: () => Promise<IBabyItem[]>;
  addBaby: (data: IBabyInfo) => Promise<boolean>;
}
