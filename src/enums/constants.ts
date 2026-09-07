import type { IVisibleRoles } from "@/types";

/** 设计稿宽度(375px) */
export const DESIGN_WIDTH = 375;

/** 登录模式 */
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

/** 血型选项 */
export const BLOOD_TYPE_OPTIONS = [
  { name: "A型-Rh-阳性" },
  { name: "A型-Rh-阴性" },
  { name: "B型-Rh-阳性" },
  { name: "B型-Rh-阴性" },
  { name: "AB型-Rh-阳性" },
  { name: "AB型-Rh-阴性" },
  { name: "O型-Rh-阳性" },
  { name: "O型-Rh-阴性" },
];

/** 性别选项 */
export const GENDER_OPTIONS = [{ name: "女" }, { name: "男" }];

/** 与宝宝关系选项 */
export const RELATION_OPTIONS = [
  { name: "妈妈", value: "mother" },
  { name: "爸爸", value: "father" },
  { name: "爷爷奶奶/外公外婆", value: "grandparent" },
  { name: "其他亲属", value: "other" },
];

/** 记录可见性选项 */
export const visibilityOptions: {
  value: IVisibleRoles;
  label: string;
}[] = [
  { value: "public", label: "公开" },
  { value: "family", label: "仅家人可见" },
  { value: "private", label: "仅自己可见" },
];

// 记录权限
export const TIME_LINE_VISIBLE_ROLES = {
  PUBLIC: "public", // 公开
  FAMILY: "family", // 家庭
  PRIVATE: "private", // 私有
};

// 用户与宝宝关系
export const USER_AND_BABY_RELATION = {
  MOTHER: "mother",
  FATHER: "father",
  GRAND_PARENT: "grandparent",
  OTHER: "other",
};

/** 发布者关系标签 */
export const RELATION_COLORS: Record<string, { color: string; bg: string }> = {
  mother: { color: "#ff6b8a", bg: "#fff0f3" },
  father: { color: "#3b82f6", bg: "#e8f1ff" },
  grandparent: { color: "#f59e0b", bg: "#fff5e6" },
  other: { color: "#6b7280", bg: "#f3f4f6" },
};

/** 分页大小 */
export const DEFAULT_PAGE_SIZE = 10;
