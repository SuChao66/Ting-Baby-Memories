// 导入常量
import { SYMPTOM_RECORD_TYPES } from "@/enums/constants";
// 导入类型
import type { SymptomRecordType } from "@/types";
// 导入工具函数
import { vw } from "@/utils";
// 导入图标
import {
  FaThermometerHalf,
  FaBriefcaseMedical,
  FaPills,
  FaUserMd,
  FaClipboardList,
} from "react-icons/fa";

/** 底部操作按钮配置 */
export const actionList: {
  key: SymptomRecordType;
  label: string;
  icon: JSX.Element;
  gradient: string;
}[] = [
  {
    key: SYMPTOM_RECORD_TYPES.TEMPERATURE,
    label: "+体温",
    icon: <FaThermometerHalf color="#fff" size={vw(24)} />,
    gradient: "linear-gradient(135deg, #ff9a8b 0%, #ff6a5b 100%)",
  },
  {
    key: SYMPTOM_RECORD_TYPES.SYMPTOM,
    label: "+症状",
    icon: <FaBriefcaseMedical color="#fff" size={vw(24)} />,
    gradient: "linear-gradient(135deg, #c58bf2 0%, #a06af9 100%)",
  },
  {
    key: SYMPTOM_RECORD_TYPES.MEDICATION,
    label: "+用药",
    icon: <FaPills color="#fff" size={vw(22)} />,
    gradient: "linear-gradient(135deg, #6ec1ff 0%, #3aa0ff 100%)",
  },
  {
    key: SYMPTOM_RECORD_TYPES.DOCTOR,
    label: "+看医生",
    icon: <FaUserMd color="#fff" size={vw(22)} />,
    gradient: "linear-gradient(135deg, #ffcf7b 0%, #ffa940 100%)",
  },
  {
    key: SYMPTOM_RECORD_TYPES.MEMO,
    label: "+备忘",
    icon: <FaClipboardList color="#fff" size={vw(22)} />,
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #f65e6e 100%)",
  },
];

/** 各记录类型对应的添加文案配置 */
export const recordTypeConfig: Record<
  SymptomRecordType,
  { title: string; editTitle: string }
> = {
  [SYMPTOM_RECORD_TYPES.TEMPERATURE]: {
    title: "添加体温记录",
    editTitle: "编辑体温记录",
  },
  [SYMPTOM_RECORD_TYPES.SYMPTOM]: {
    title: "添加症状记录",
    editTitle: "编辑症状记录",
  },
  [SYMPTOM_RECORD_TYPES.MEDICATION]: {
    title: "添加用药记录",
    editTitle: "编辑用药记录",
  },
  [SYMPTOM_RECORD_TYPES.DOCTOR]: {
    title: "添加看医生记录",
    editTitle: "编辑看医生记录",
  },
  [SYMPTOM_RECORD_TYPES.MEMO]: {
    title: "添加备忘",
    editTitle: "编辑备忘",
  },
};

/** 记录类型筛选选项（筛选栏类型 chips 用） */
export const filterTypeOptions: {
  value: SymptomRecordType;
  label: string;
}[] = [
  { value: SYMPTOM_RECORD_TYPES.TEMPERATURE, label: "体温" },
  { value: SYMPTOM_RECORD_TYPES.SYMPTOM, label: "症状" },
  { value: SYMPTOM_RECORD_TYPES.MEDICATION, label: "用药" },
  { value: SYMPTOM_RECORD_TYPES.DOCTOR, label: "看医生" },
  { value: SYMPTOM_RECORD_TYPES.MEMO, label: "备忘" },
];
