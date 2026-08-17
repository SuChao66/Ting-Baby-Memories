/** 设计稿宽度(375px) */
export const DESIGN_WIDTH = 375;

/** 登陆模式 */
export const LOGIN_MODE = {
  /** 登录 */
  LOGIN: "login",
  /** 注册 */
  REGISTER: "register",
  /** 忘记密码 */
  FORGOT_PASSWORD: "forgotPassword",
} as const;

/** 密码强度校验正则表达式 */
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]).{6,}$/;

/** 手机号校验正则表达式 */
export const PHONE_REGEX = /^1[3456789]\d{9}$/;
