import { useState, useEffect } from "react";
// 导入图标
import { AiOutlineRight } from "react-icons/ai";
// 导入工具函数
import { vw, formatDateTime } from "@/utils";
// 导入类型
import type { SymptomRecordType } from "@/types";
import type { PickerOptions, PickerValue } from "@nutui/nutui-react";
import type {
  IAddSymptomRecordParams,
  IGetSymptomRecordItem,
} from "@/interface/symptom";
// 导入常量
import {
  SYMPTOM_RECORD_TYPES,
  MEDICATION_USAGE_TYPES,
  TEMPERATURE_RANGE,
} from "@/enums";
// 导入配置
import { recordTypeConfig } from "../../actionConfig";
// 导入症状选项与药品使用类型选项
import { symptomGroups, medicationUsageTypeOptions } from "../../constants";
// 导入store
import { useSymptomStore } from "@/store";
// 导入样式
import {
  AddRecordPopup,
  PopupHeader,
  HeaderCancel,
  HeaderTitle,
  HeaderSave,
  FormRow,
  FormRowLabel,
  FormRowValue,
  TextInput,
  TempInput,
  TempUnit,
  SymptomSection,
  SymptomLabel,
  SymptomChips,
  SymptomChip,
  RemarkSection,
  SectionLabel,
  RemarkTextarea,
} from "./styles";

interface AddSymptomRecordProps {
  /** babyId */
  babyId: string;
  /** 记录类型 */
  type: SymptomRecordType;
  /** 是否显示 */
  visible: boolean;
  /** 编辑记录 */
  currentRecord: IGetSymptomRecordItem | null;
  /** 关闭回调 */
  onClose: () => void;
  /** 获取数据 */
  onGetData: () => void;
}

function AddSymptomRecord(props: AddSymptomRecordProps) {
  const { babyId, type, visible, currentRecord, onClose, onGetData } = props;
  const { addSymptomRecord, editSymptomRecord } = useSymptomStore(
    (state) => state,
  );

  // 根据类型获取标题
  const { title, editTitle } = recordTypeConfig[type];

  // 记录时间
  const [startDateTime, setStartDateTime] = useState(new Date());
  // 记录时间选择器显示
  const [startPickerVisible, setStartPickerVisible] = useState(false);
  // 体温值（仅体温类型）
  const [temperature, setTemperature] = useState<number | string>("");
  // 症状多选（仅症状类型）
  const [symptoms, setSymptoms] = useState<string[]>([]);
  // 药品使用类型（仅用药类型）：internal-内服 / external-外用，默认内服
  const [medicineType, setMedicineType] = useState<string>(
    MEDICATION_USAGE_TYPES.INTERNAL,
  );
  // 药品名称（仅用药类型）
  const [medicineName, setMedicineName] = useState("");
  // 用药剂量（仅用药类型）
  const [dosage, setDosage] = useState("");
  // 就诊医院（仅看医生类型）
  const [hospital, setHospital] = useState("");
  // 就诊科室（仅看医生类型）
  const [department, setDepartment] = useState("");
  // 就诊医生（仅看医生类型）
  const [doctor, setDoctor] = useState("");
  // 就诊原因/诊断（仅看医生类型）
  const [diagnosis, setDiagnosis] = useState("");
  // 医生建议（仅看医生类型）
  const [advice, setAdvice] = useState("");
  // 备忘内容（仅备忘类型）
  const [content, setContent] = useState("");
  // 备注
  const [remark, setRemark] = useState("");

  // 重置状态（弹窗打开时重置一次）
  useEffect(() => {
    if (visible) {
      // 根据currentRecord判断是编辑还是新增
      const isEdit = currentRecord !== null;
      setStartDateTime(isEdit ? new Date(currentRecord.startTime) : new Date());
      setStartPickerVisible(false);
      setTemperature(isEdit ? (currentRecord.temperature ?? "") : "");
      setSymptoms(isEdit ? (currentRecord.symptoms ?? []) : []);
      setMedicineType(
        isEdit
          ? (currentRecord.medicineType ?? MEDICATION_USAGE_TYPES.INTERNAL)
          : MEDICATION_USAGE_TYPES.INTERNAL,
      );
      setMedicineName(isEdit ? (currentRecord.medicineName ?? "") : "");
      setDosage(isEdit ? (currentRecord.dosage ?? "") : "");
      setHospital(isEdit ? (currentRecord.hospital ?? "") : "");
      setDepartment(isEdit ? (currentRecord.department ?? "") : "");
      setDoctor(isEdit ? (currentRecord.doctor ?? "") : "");
      setDiagnosis(isEdit ? (currentRecord.diagnosis ?? "") : "");
      setAdvice(isEdit ? (currentRecord.advice ?? "") : "");
      setContent(isEdit ? (currentRecord.content ?? "") : "");
      setRemark(isEdit ? currentRecord.remark : "");
    }
  }, [visible]);

  // 选择记录时间（只能选当前时间之前，最早一周前）
  const handleStartConfirm = (
    _options: PickerOptions,
    values: PickerValue[],
  ) => {
    const [Y, M, D, h, m] = values.map(Number);
    if ([Y, M, D, h, m].some((v) => Number.isNaN(v))) return;
    setStartDateTime(new Date(Y, M - 1, D, h, m));
    setStartPickerVisible(false);
  };

  // 切换症状选中状态
  const toggleSymptom = (value: string) => {
    setSymptoms((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  // 保存
  const handleSave = async () => {
    // 按类型校验
    if (type === SYMPTOM_RECORD_TYPES.TEMPERATURE) {
      const value = Number(temperature);
      if (!temperature || Number.isNaN(value)) {
        Toast.show({ title: "请输入体温", icon: "warn" });
        return;
      }
      if (value < TEMPERATURE_RANGE.MIN || value > TEMPERATURE_RANGE.MAX) {
        Toast.show({
          title: `体温需在${TEMPERATURE_RANGE.MIN}℃~${TEMPERATURE_RANGE.MAX}℃之间`,
          icon: "warn",
        });
        return;
      }
    } else if (type === SYMPTOM_RECORD_TYPES.SYMPTOM) {
      if (!symptoms.length) {
        Toast.show({ title: "请选择症状", icon: "warn" });
        return;
      }
    } else if (type === SYMPTOM_RECORD_TYPES.MEDICATION) {
      if (!medicineName) {
        Toast.show({ title: "请输入药品名称", icon: "warn" });
        return;
      }
    } else if (type === SYMPTOM_RECORD_TYPES.DOCTOR) {
      if (!diagnosis) {
        Toast.show({ title: "请输入就诊原因或诊断", icon: "warn" });
        return;
      }
    } else if (type === SYMPTOM_RECORD_TYPES.MEMO) {
      if (!content) {
        Toast.show({ title: "请输入备忘内容", icon: "warn" });
        return;
      }
    }
    const params: IAddSymptomRecordParams = {
      babyId,
      type,
      startTime: startDateTime,
      remark,
      // 体温
      temperature:
        type === SYMPTOM_RECORD_TYPES.TEMPERATURE
          ? Number(temperature)
          : undefined,
      // 症状
      symptoms: type === SYMPTOM_RECORD_TYPES.SYMPTOM ? symptoms : undefined,
      // 用药
      medicineType:
        type === SYMPTOM_RECORD_TYPES.MEDICATION ? medicineType : undefined,
      medicineName:
        type === SYMPTOM_RECORD_TYPES.MEDICATION ? medicineName : undefined,
      dosage: type === SYMPTOM_RECORD_TYPES.MEDICATION ? dosage : undefined,
      // 看医生
      hospital: type === SYMPTOM_RECORD_TYPES.DOCTOR ? hospital : undefined,
      department: type === SYMPTOM_RECORD_TYPES.DOCTOR ? department : undefined,
      doctor: type === SYMPTOM_RECORD_TYPES.DOCTOR ? doctor : undefined,
      diagnosis: type === SYMPTOM_RECORD_TYPES.DOCTOR ? diagnosis : undefined,
      advice: type === SYMPTOM_RECORD_TYPES.DOCTOR ? advice : undefined,
      // 备忘
      content: type === SYMPTOM_RECORD_TYPES.MEMO ? content : undefined,
    };
    const isEdit = currentRecord !== null;
    const ok = await (isEdit
      ? editSymptomRecord({ ...params, id: currentRecord._id })
      : addSymptomRecord(params));
    if (ok) {
      Toast.show({
        content: `${isEdit ? editTitle : title}成功`,
        icon: "success",
      });
      onClose();
      onGetData();
    }
  };

  return (
    <>
      <Popup
        visible={visible}
        position="bottom"
        round
        minHeight="60%"
        closeOnOverlayClick={false}
        onClose={onClose}
      >
        <AddRecordPopup>
          {/* 顶部导航 */}
          <PopupHeader>
            <HeaderCancel onClick={onClose}>取消</HeaderCancel>
            <HeaderTitle>
              {currentRecord !== null ? editTitle : title}
            </HeaderTitle>
            <HeaderSave onClick={handleSave}>保存</HeaderSave>
          </PopupHeader>

          {/* 记录时间行 */}
          <FormRow>
            <FormRowLabel>记录时间</FormRowLabel>
            <FormRowValue onClick={() => setStartPickerVisible(true)}>
              <span>{formatDateTime(startDateTime)}</span>
              <AiOutlineRight size={vw(14)} color="#ccc" />
            </FormRowValue>
          </FormRow>

          {/* 体温类型：体温值输入 */}
          {type === SYMPTOM_RECORD_TYPES.TEMPERATURE && (
            <FormRow>
              <FormRowLabel>体温</FormRowLabel>
              <FormRowValue>
                <TempInput
                  type="number"
                  step="0.1"
                  placeholder="请输入"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
                <TempUnit>℃</TempUnit>
              </FormRowValue>
            </FormRow>
          )}

          {/* 症状类型：症状多选（按身体部位分组展示） */}
          {type === SYMPTOM_RECORD_TYPES.SYMPTOM && (
            <>
              {symptomGroups.map((group) => (
                <SymptomSection key={group.label}>
                  <SymptomLabel>{group.label}</SymptomLabel>
                  <SymptomChips>
                    {group.options.map((item) => (
                      <SymptomChip
                        key={item.value}
                        $active={symptoms.includes(item.value)}
                        onClick={() => toggleSymptom(item.value)}
                      >
                        {item.label}
                      </SymptomChip>
                    ))}
                  </SymptomChips>
                </SymptomSection>
              ))}
            </>
          )}

          {/* 用药类型：使用类型（内服/外用）+ 药品名称 + 剂量 */}
          {type === SYMPTOM_RECORD_TYPES.MEDICATION && (
            <>
              <SymptomSection>
                <SymptomLabel>使用类型</SymptomLabel>
                <SymptomChips>
                  {medicationUsageTypeOptions.map((item) => (
                    <SymptomChip
                      key={item.value}
                      $active={medicineType === item.value}
                      onClick={() => setMedicineType(item.value)}
                    >
                      {item.label}
                    </SymptomChip>
                  ))}
                </SymptomChips>
              </SymptomSection>
              <FormRow>
                <FormRowLabel>药品名称</FormRowLabel>
                <TextInput
                  type="text"
                  placeholder="请输入"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                />
              </FormRow>
              <FormRow>
                <FormRowLabel>剂量</FormRowLabel>
                <TextInput
                  type="text"
                  placeholder="如 5ml / 0.5袋 / 1片"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                />
              </FormRow>
            </>
          )}

          {/* 看医生类型：就诊医院/科室/医生 + 就诊原因/诊断 + 医生建议 */}
          {type === SYMPTOM_RECORD_TYPES.DOCTOR && (
            <>
              <FormRow>
                <FormRowLabel>就诊医院</FormRowLabel>
                <TextInput
                  type="text"
                  placeholder="请输入"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                />
              </FormRow>
              <FormRow>
                <FormRowLabel>就诊科室</FormRowLabel>
                <TextInput
                  type="text"
                  placeholder="如 儿科 / 呼吸内科"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </FormRow>
              <FormRow>
                <FormRowLabel>就诊医生</FormRowLabel>
                <TextInput
                  type="text"
                  placeholder="请输入"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                />
              </FormRow>
              <FormRow>
                <FormRowLabel>就诊原因/诊断</FormRowLabel>
                <TextInput
                  type="text"
                  placeholder="请输入"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
              </FormRow>
              <RemarkSection>
                <SectionLabel>医生建议</SectionLabel>
                <RemarkTextarea
                  placeholder="输入医生建议"
                  maxLength={200}
                  value={advice}
                  onChange={(e) => setAdvice(e.target.value)}
                />
              </RemarkSection>
            </>
          )}

          {/* 备忘类型：备忘内容 */}
          {type === SYMPTOM_RECORD_TYPES.MEMO && (
            <RemarkSection>
              <SectionLabel>备忘内容</SectionLabel>
              <RemarkTextarea
                placeholder="输入备忘内容"
                maxLength={200}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </RemarkSection>
          )}

          {/* 备注 */}
          {type !== SYMPTOM_RECORD_TYPES.DOCTOR &&
            type !== SYMPTOM_RECORD_TYPES.MEMO && (
              <RemarkSection>
                <SectionLabel>添加备注</SectionLabel>
                <RemarkTextarea
                  placeholder="输入备注内容"
                  maxLength={200}
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
              </RemarkSection>
            )}
        </AddRecordPopup>
      </Popup>

      {/* 记录时间选择器（一周前 ~ 当前时间） */}
      <DatePicker
        title="选择记录时间"
        type="datetime"
        showChinese
        visible={startPickerVisible}
        startDate={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}
        endDate={new Date()}
        value={startDateTime}
        onConfirm={handleStartConfirm}
        onCancel={() => setStartPickerVisible(false)}
        onClose={() => setStartPickerVisible(false)}
      />
    </>
  );
}

export default AddSymptomRecord;
