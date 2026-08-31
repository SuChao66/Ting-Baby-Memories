// 导入请求方法
import { get, post } from "@/api/request";
// 导入用户接口类型
import type {
  LoginRequest,
  RegisterRequest,
  ForgetPasswordRequest,
  ChangePasswordRequest,
  User,
} from "@/interface/user";

// 登录接口
export function loginApi(data: LoginRequest) {
  return post<{ token: string; userInfo: User }>("/api/v1/user/login", data);
}

// 注册接口
export function registerApi(data: RegisterRequest) {
  return post<string>("/api/v1/user/register", data);
}

// 忘记密码接口
export function forgetPasswordApi(data: ForgetPasswordRequest) {
  return post<string>("/api/v1/user/forget_password", data);
}

// 修改密码接口
export function changePasswordApi(data: ChangePasswordRequest) {
  return post<string>("/api/v1/user/change_password", data);
}

// 获取用户信息接口
export function getUserInfoApi() {
  return get<User>("/api/v1/user/user");
}

// 更新用户信息接口
export function updateUserInfoApi(data: {
  id: string;
  nickname?: string;
  gender?: number;
  phone?: string;
  birthday?: string;
  avatarUrl?: string;
}) {
  return post<string>("/api/v1/user/update", data);
}
