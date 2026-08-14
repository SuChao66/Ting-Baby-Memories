// 导入请求方法
import { post } from "@/api/request";
// 导入用户接口类型
import type {
  LoginRequest,
  RegisterRequest,
  ForgetPasswordRequest,
} from "@/interface/user";

// 登录接口
export function loginApi(data: LoginRequest) {
  return post<string>("/api/v1/user/login", data);
}

// 注册接口
export function registerApi(data: RegisterRequest) {
  return post<string>("/api/v1/user/register", data);
}

// 忘记密码接口
export function forgetPasswordApi(data: ForgetPasswordRequest) {
  return post<string>("/api/v1/user/forget_password", data);
}
