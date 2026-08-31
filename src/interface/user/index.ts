// 登录请求参数
export interface LoginRequest {
  username: string;
  password: string;
}

// 用户信息
export interface User {
  profile: {
    birthday: Date | null | undefined;
    height: number | null | undefined;
  };
  gender: 0 | 1;
  phone: string | null | undefined;
  _id: string;
  username: string;
  password: string;
  confirmPassword: string | null | undefined;
  nickname: string | null | undefined;
  avatarUrl: string | null | undefined;
  status: 1 | 0;
  createdAt: string;
  updatedAt: string;
}

// 注册请求参数
export interface RegisterRequest {
  username: string;
  password: string;
  confirmPassword: string;
}

// 忘记密码请求参数
export interface ForgetPasswordRequest {
  username: string;
  password: string;
  confirmPassword: string;
}

// 修改密码请求参数
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
