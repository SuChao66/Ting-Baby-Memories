/** 与宝宝关系 */
export type TRelation = "mother" | "father" | "grandparent" | "other";

/** 宝宝信息类型 */
export interface IBabyInfo {
  nickname: string;
  avatarUrl: string;
  gender: 0 | 1 | null;
  birthday: Date | null;
  birthTime: string;
  bloodType: string | null;
  birthWeight: string;
  birthHeight: string;
  allergens: string;
  preferences: string;
  remarks: string;
  relation: TRelation | null;
}

/** 宝宝列表数据 */
export interface IBabyItem {
  profile: Profile;
  _id: string;
  nickname: string;
  avatarUrl: string;
  gender: number;
  birthday: Date;
  birthTime: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  relation: string;
  role: string;
}

export interface Profile {
  bloodType: any;
  birthWeight: number;
  birthHeight: number;
  allergens: string;
  preferences: string;
  remarks: string;
}
