import { LOGIN_MODE } from "@/enums/constants";

/** 表单模式 */
export type Mode = (typeof LOGIN_MODE)[keyof typeof LOGIN_MODE];

/** 记录可见范围  */
export type IVisibleRoles = "public" | "family" | "private";

/** 云相册筛选类型 */
export type TabKey = "all" | "img" | "video";

/** 信封拆开阶段：closed 信封 -> flipping 翻盖翻开 -> pulling 信纸升起 */
export type EnvelopePhase = "closed" | "flipping" | "pulling";
