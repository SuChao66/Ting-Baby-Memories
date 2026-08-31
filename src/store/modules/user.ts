import { create } from "zustand";
// 导入类型
import type { UserState } from "../types";
// 导入登录接口
import {
  loginApi,
  registerApi,
  forgetPasswordApi,
  changePasswordApi,
  getUserInfoApi,
  updateUserInfoApi,
} from "@/api/user";
// 导入用户接口类型
import type { ChangePasswordRequest } from "@/interface/user";
// 导入加密方法
import { encrypt } from "@/utils";
// 导入密码强度校验正则表达式
import { PASSWORD_REGEX } from "@/enums";

// 初始化 token（从 localStorage 读取）
const initialToken = localStorage.getItem("token");
// 初始化 userInfo（从 localStorage 读取）
const initialUserInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
// 校验注册参数
const validateParams = (
  username: string,
  password: string,
  confirmPassword: string,
) => {
  if (!username) {
    Toast.show({
      title: "请输入用户名",
      icon: "warn",
    });
    return false;
  }
  if (!password) {
    Toast.show({
      title: "请输入密码",
      icon: "warn",
    });
    return false;
  }
  if (!confirmPassword) {
    Toast.show({
      title: "请输入确认密码",
      icon: "warn",
    });
    return false;
  }
  // 校验密码强度
  if (!PASSWORD_REGEX.test(password)) {
    Toast.show({
      title: "密码至少6位，需包含大小写字母、数字和特殊字符",
      icon: "warn",
    });
    return false;
  }
  // 判断两次密码是否一致
  if (password !== confirmPassword) {
    Toast.show({
      title: "两次输入密码不一致",
      icon: "warn",
    });
    return false;
  }
  return true;
};

// 创建用户状态管理模块
export const useUserStore = create<UserState>((set) => ({
  isLogin: !!initialToken,
  token: initialToken,
  userInfo: initialUserInfo,
  // 登录方法
  login: async (username: string, password: string) => {
    if (!username) {
      Toast.show({
        title: "请输入用户名",
        icon: "warn",
      });
      return false;
    }
    if (!password) {
      Toast.show({
        title: "请输入密码",
        icon: "warn",
      });
      return false;
    }
    const { code, data } = await loginApi({
      username,
      password: encrypt(password),
    });
    if (code === 0) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
      set({ isLogin: true, token: data.token, userInfo: data.userInfo });
      Toast.show({
        title: "登录成功",
        icon: "success",
      });
      return true;
    }
    return false;
  },
  // 注册方法
  register: async (
    username: string,
    password: string,
    confirmPassword: string,
  ) => {
    const valid = validateParams(username, password, confirmPassword);
    if (valid) {
      const { code } = await registerApi({
        username,
        password: encrypt(password),
        confirmPassword: encrypt(confirmPassword),
      });
      if (code === 0) {
        Toast.show({
          title: "注册成功",
          icon: "success",
        });
        return true;
      }
      return false;
    }
    return false;
  },
  // 忘记密码方法
  forgetPassword: async (
    username: string,
    password: string,
    confirmPassword: string,
  ) => {
    const valid = validateParams(username, password, confirmPassword);
    if (valid) {
      const { code } = await forgetPasswordApi({
        username,
        password: encrypt(password),
        confirmPassword: encrypt(confirmPassword),
      });
      if (code === 0) {
        Toast.show({
          title: "修改密码成功",
          icon: "success",
        });
        return true;
      }
      return false;
    }
    return false;
  },
  // 修改密码
  changePassword: async (params: ChangePasswordRequest) => {
    const { oldPassword, newPassword, confirmPassword } = params;
    if (!oldPassword) {
      Toast.show({
        title: "请输入原密码",
        icon: "warn",
      });
      return false;
    }
    if (!newPassword) {
      Toast.show({
        title: "请输入新密码",
        icon: "warn",
      });
      return false;
    }
    if (!confirmPassword) {
      Toast.show({
        title: "请再次输入新密码",
        icon: "warn",
      });
      return false;
    }
    // 校验密码强度
    if (!PASSWORD_REGEX.test(newPassword)) {
      Toast.show({
        title: "密码至少6位，需包含大小写字母、数字和特殊字符",
        icon: "warn",
      });
      return false;
    }
    // 判断两次密码是否一致
    if (newPassword !== confirmPassword) {
      Toast.show({
        title: "两次输入密码不一致",
        icon: "warn",
      });
      return false;
    }
    const { code } = await changePasswordApi({
      oldPassword,
      newPassword: encrypt(newPassword),
      confirmPassword: encrypt(confirmPassword),
    });
    return code === 0 ? true : false;
  },
  // 退出登录方法
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    set({ isLogin: false, token: null });
  },
  // 获取用户消息
  getUserInfo: async () => {
    const { code, data } = await getUserInfoApi();
    if (code === 0) {
      localStorage.setItem("userInfo", JSON.stringify(data));
      set({ userInfo: data });
    }
  },
  // 更新用户信息
  updateUserInfo: async (params) => {
    const { code } = await updateUserInfoApi(params);
    return code === 0 ? true : false;
  },
}));
