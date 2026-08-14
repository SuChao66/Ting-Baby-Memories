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
  token: string | null; // 登录凭证
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
}
