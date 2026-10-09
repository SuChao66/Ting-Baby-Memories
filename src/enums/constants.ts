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

/** 吃喝拉撒睡类型 */
export const DAILY_RECORD_TYPES = {
  /** 喂奶 */
  FEED: "feed",
  /** 睡眠 */
  SLEEP: "sleep",
  /** 换尿布 */
  DIAPER: "diaper",
  /** 辅食 */
  FOOD: "food",
  /** 洗澡 */
  BATH: "bath",
  /** 玩耍 */
  PLAY: "play",
  /** 游泳 */
  SWIM: "swim",
  /** 其他事件 */
  OTHER: "other",
};

/** 症状护理类型 */
export const SYMPTOM_RECORD_TYPES = {
  /** 体温 */
  TEMPERATURE: "temperature",
  /** 症状 */
  SYMPTOM: "symptom",
  /** 用药 */
  MEDICATION: "medication",
  /** 看医生 */
  DOCTOR: "doctor",
  /** 备忘 */
  MEMO: "memo",
} as const;

/** 症状选项分组（按身体部位，value 与后端枚举一致，对应设计图症状记录页） */
export const SYMPTOM_GROUPS = [
  {
    label: "头部",
    options: [
      { value: "runnyNose", label: "流鼻涕" },
      { value: "cough", label: "咳嗽" },
      { value: "spitUpMilk", label: "吐奶" },
      { value: "occipitalBaldness", label: "枕秃" },
      { value: "teethGrinding", label: "磨牙" },
      { value: "nosebleed", label: "流鼻血" },
      { value: "eyeDischarge", label: "眼屎多" },
      { value: "drooling", label: "流口水" },
      { value: "snoring", label: "打鼾" },
      { value: "badBreath", label: "口臭" },
    ],
  },
  {
    label: "腹部",
    options: [
      { value: "bellyAche", label: "肚子疼" },
      { value: "diarrhea", label: "腹泻" },
    ],
  },
  {
    label: "腰臀",
    options: [
      { value: "diaperRash", label: "红屁股" },
      { value: "constipation", label: "便秘" },
      { value: "frequentUrination", label: "尿频" },
    ],
  },
  {
    label: "全身",
    options: [
      { value: "fever", label: "发热" },
      { value: "rash", label: "出疹子" },
      { value: "sweating", label: "多汗" },
      { value: "convulsion", label: "抽搐" },
      { value: "shortStature", label: "身材矮小" },
    ],
  },
  {
    label: "其他",
    options: [
      { value: "lethargy", label: "无精打采" },
      { value: "emotionalInstability", label: "情绪不稳定" },
      { value: "poorAppetite", label: "无食欲" },
      { value: "nightCrying", label: "夜啼" },
      { value: "drowsiness", label: "嗜睡" },
    ],
  },
] as const;

/** 症状选项（按分组平铺） */
export const SYMPTOM_OPTIONS = SYMPTOM_GROUPS.flatMap((group) =>
  group.options.map((option) => option.value),
);

/** 药品使用类型 */
export const MEDICATION_USAGE_TYPES = {
  /** 内服 */
  INTERNAL: "internal",
  /** 外用（如退烧贴） */
  EXTERNAL: "external",
} as const;

/** 体温值范围（℃） */
export const TEMPERATURE_RANGE = { MIN: 34, MAX: 43 } as const;

/** 邀请链接有效期选项（天） */
export const EXPIRE_OPTIONS = [
  { value: 7, label: "7 天" },
  { value: 30, label: "30 天" },
];
