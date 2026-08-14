// 登录请求参数
export interface LoginRequest {
  username: string;
  password: string;
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
