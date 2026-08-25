import { LOGIN_MODE } from "@/enums/constants";

/** 表单模式 */
export type Mode = (typeof LOGIN_MODE)[keyof typeof LOGIN_MODE];

/** 记录可见范围  */
export type IVisibleRoles = "public" | "family" | "private";
