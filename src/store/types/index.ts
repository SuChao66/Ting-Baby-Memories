// 定义宝宝状态类型
export interface BabyState {
  name: string;
  birthday: string;
  setName: (name: string) => void;
  setBirthday: (birthday: string) => void;
}

// 定义用户状态类型
export interface UserState {
  isLogin: boolean; // 是否登录
}
