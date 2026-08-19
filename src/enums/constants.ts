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
