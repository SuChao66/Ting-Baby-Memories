import { useState } from "react";
// 导入类型
import type { IGetSymptomRecordItem } from "@/interface/symptom";
// 导入常量
import { SYMPTOM_RECORD_TYPES } from "@/enums";
// 导入症状映射
import { SYMPTOM_LABEL_MAP, MEDICATION_USAGE_LABEL_MAP } from "../../constants";
// 导入图标
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
// 导入配置
import { actionList, filterTypeOptions } from "../../actionConfig";
// 导入样式
import {
  RecordListWrap,
  RecordItem,
  RecordIconWrap,
  RecordContent,
  RecordTitle,
  RecordSummary,
  RecordRemark,
  RecordRight,
  RecordTime,
  RecordActions,
  RecordActionBtn,
} from "./styles";
// 导入工具函数
import { formatTime } from "@/utils";
// 导入组件
import Dialog from "@/baseUI/dialog";
// 导入store
import { useUserStore } from "@/store";

interface IProps {
  list: IGetSymptomRecordItem[];
  /** 点击编辑按钮（逻辑由父组件实现） */
  onEdit?: (item: IGetSymptomRecordItem) => void;
  /** 点击删除按钮（逻辑由父组件实现） */
  onDelete?: (item: IGetSymptomRecordItem) => void;
}

/** 获取类型的展示信息（图标、渐变色、中文名称） */
function getTypeMeta(type: string) {
  const action = actionList.find((a) => a.key === type);
  const label =
    filterTypeOptions.find((f) => f.value === type)?.label ?? "记录";
  return { icon: action?.icon, gradient: action?.gradient, label };
}

/** 按类型生成摘要文案（不同类型记录只含自身字段，缺失字段容错跳过） */
function getSummary(item: IGetSymptomRecordItem): string {
  const parts: string[] = [];
  switch (item.type) {
    // 体温：体温值
    case SYMPTOM_RECORD_TYPES.TEMPERATURE:
      if (item.temperature) parts.push(`体温 ${item.temperature}℃`);
      break;
    // 症状：症状列表
    case SYMPTOM_RECORD_TYPES.SYMPTOM:
      if (item.symptoms?.length) {
        parts.push(
          item.symptoms
            .map((value) => SYMPTOM_LABEL_MAP[value] ?? value)
            .join("、"),
        );
      }
      break;
    // 用药：使用类型、药品名称与剂量
    case SYMPTOM_RECORD_TYPES.MEDICATION:
      if (item.medicineType) {
        parts.push(MEDICATION_USAGE_LABEL_MAP[item.medicineType] ?? "");
      }
      if (item.medicineName) parts.push(item.medicineName);
      if (item.dosage) parts.push(item.dosage);
      break;
    // 看医生：医院/科室/医生、就诊原因/诊断
    case SYMPTOM_RECORD_TYPES.DOCTOR: {
      const visitInfo = [item.hospital, item.department, item.doctor].filter(
        Boolean,
      );
      if (visitInfo.length) parts.push(visitInfo.join(" "));
      if (item.diagnosis) parts.push(item.diagnosis);
      break;
    }
    // 备忘：备忘内容
    case SYMPTOM_RECORD_TYPES.MEMO:
      if (item.content) parts.push(item.content);
      break;
    default:
      break;
  }
  return parts.join(" · ");
}

function SymptomRecordList(props: IProps) {
  const { list, onEdit, onDelete } = props;
  const { userInfo } = useUserStore((state) => state);

  const [delVisible, setDelVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<IGetSymptomRecordItem | null>(
    null,
  );

  /** 是否显示操作按钮 */
  const isShowActions = (item: IGetSymptomRecordItem): boolean => {
    return item.userId === userInfo?._id;
  };

  return (
    <>
      <RecordListWrap>
        {list.map((item) => {
          const { icon, gradient, label } = getTypeMeta(item.type);
          const summary = getSummary(item);
          return (
            <RecordItem key={item._id}>
              <RecordIconWrap $gradient={gradient}>{icon}</RecordIconWrap>
              <RecordContent>
                <RecordTitle>{label}</RecordTitle>
                {summary && <RecordSummary>{summary}</RecordSummary>}
                {item.remark && <RecordRemark>{item.remark}</RecordRemark>}
              </RecordContent>
              <RecordRight>
                <RecordTime>
                  {item.startTime ? formatTime(item.startTime) : "--:--"}
                </RecordTime>
                {isShowActions(item) && (
                  <RecordActions>
                    <RecordActionBtn onClick={() => onEdit?.(item)}>
                      <CiEdit size={18} />
                    </RecordActionBtn>
                    <RecordActionBtn
                      onClick={() => {
                        setDelVisible(true);
                        setCurrentItem(item);
                      }}
                    >
                      <MdDelete size={18} />
                    </RecordActionBtn>
                  </RecordActions>
                )}
              </RecordRight>
            </RecordItem>
          );
        })}
      </RecordListWrap>

      {/* 删除确认 */}
      <Dialog
        visible={delVisible}
        content="确认删除该记录？"
        onConfirm={() => {
          if (currentItem) {
            onDelete?.(currentItem);
          }
          setDelVisible(false);
        }}
        onCancel={() => setDelVisible(false)}
      />
    </>
  );
}

export default SymptomRecordList;
