import { useState, useEffect } from "react";
// 导入图标
import { AiOutlineRight } from "react-icons/ai";
// 导入工具函数
import { vw, formatDay } from "@/utils";
// 导入类型
import type { PickerOptions, PickerValue } from "@nutui/nutui-react";
import type { IVaccineDose, IVaccineRecordItem } from "../../types";
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
  ValueInput,
  ValueUnit,
  StaticValue,
  PlanTag,
  DeleteBtn,
} from "./styles";

interface IProps {
  /** 是否显示 */
  visible: boolean;
  /** 登记目标剂次（从剂次卡进入时预填，自由补录不传） */
  targetDose?: IVaccineDose;
  /** 当前编辑记录（不传则为新增模式） */
  currentRecord?: IVaccineRecordItem;
  /** 是否显示费用项（自费疫苗或自由补录） */
  showFee: boolean;
  /** 关闭回调 */
  onClose: () => void;
  /** 保存回调（页面内调接口保存） */
  onSave: (record: IVaccineRecordItem) => void;
  /** 删除回调（页面内调接口删除） */
  onDelete: (id: string) => void;
}

// 日期可选的最早时间（往前追溯10年，覆盖接种记录）
const EARLIEST_DATE = new Date(
  new Date().setFullYear(new Date().getFullYear() - 10),
);

/** 将日期字符串解析为本地时区 Date 对象（避免 UTC 偏移） */
function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("T")[0].split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** 登记接种记录弹窗（保存/删除由页面调用接口处理） */
function AddRecord(props: IProps) {
  const {
    visible,
    targetDose,
    currentRecord,
    showFee,
    onClose,
    onSave,
    onDelete,
  } = props;

  // 是否编辑模式
  const isEdit = !!currentRecord;
  // 关联剂次：新增取 targetDose，编辑跟随记录的 doseKey
  const boundDose = targetDose;

  // 表单状态
  const [date, setDate] = useState<Date>(new Date());
  const [vaccineName, setVaccineName] = useState("");
  const [doseText, setDoseText] = useState("");
  const [hospital, setHospital] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [feeText, setFeeText] = useState("");
  const [note, setNote] = useState("");
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  // 弹窗打开时重置/填充表单
  useEffect(() => {
    if (!visible) return;
    if (currentRecord) {
      setDate(parseLocalDate(currentRecord.injectDate));
      setVaccineName(currentRecord.vaccineName);
      setDoseText(currentRecord.dose != null ? String(currentRecord.dose) : "");
      setHospital(currentRecord.hospital ?? "");
      setBatchNo(currentRecord.batchNo ?? "");
      setFeeText(currentRecord.fee != null ? String(currentRecord.fee) : "");
      setNote(currentRecord.note ?? "");
    } else {
      setDate(new Date());
      setVaccineName(targetDose?.vaccineName ?? "");
      setDoseText(targetDose ? String(targetDose.dose) : "");
      setHospital("");
      setBatchNo("");
      setFeeText("");
      setNote("");
    }
    setDatePickerVisible(false);
  }, [visible, currentRecord, targetDose]);

  // 选择接种日期（最早10年前 ~ 今天）
  const handleDateConfirm = (
    _options: PickerOptions,
    values: PickerValue[],
  ) => {
    const [Y, M, D] = values.map(Number);
    if ([Y, M, D].some((v) => Number.isNaN(v))) return;
    setDate(new Date(Y, M - 1, D));
    setDatePickerVisible(false);
  };

  // 保存（组装记录后交由页面调接口）
  const handleSave = () => {
    if (!vaccineName.trim()) {
      Toast.show({ title: "请填写疫苗名称", icon: "warn" });
      return;
    }
    const doseNum = Number(doseText);
    const feeNum = Number(feeText);
    onSave({
      id: currentRecord?.id ?? `local-${Date.now()}`,
      doseKey: currentRecord?.doseKey ?? boundDose?.key,
      vaccineName: vaccineName.trim(),
      dose: doseText !== "" && !Number.isNaN(doseNum) ? doseNum : undefined,
      injectDate: formatDay(date),
      hospital: hospital.trim() || undefined,
      batchNo: batchNo.trim() || undefined,
      fee: feeText !== "" && !Number.isNaN(feeNum) ? feeNum : undefined,
      note: note.trim() || undefined,
    });
  };

  return (
    <>
      <Popup
        visible={visible}
        position="bottom"
        round
        closeOnOverlayClick={false}
        onClose={onClose}
      >
        <AddRecordPopup>
          {/* 顶部导航 */}
          <PopupHeader>
            <HeaderCancel onClick={onClose}>取消</HeaderCancel>
            <HeaderTitle>
              {isEdit
                ? "编辑接种记录"
                : boundDose
                  ? "登记接种"
                  : "补录接种记录"}
            </HeaderTitle>
            <HeaderSave onClick={handleSave}>保存</HeaderSave>
          </PopupHeader>

          {/* 接种日期 */}
          <FormRow>
            <FormRowLabel>接种日期</FormRowLabel>
            <FormRowValue onClick={() => setDatePickerVisible(true)}>
              <span>{formatDay(date)}</span>
              <AiOutlineRight size={vw(14)} color="#ccc" />
            </FormRowValue>
          </FormRow>

          {/* 疫苗名称：关联剂次时只读 */}
          <FormRow>
            <FormRowLabel>疫苗名称</FormRowLabel>
            {boundDose ? (
              <FormRowValue>
                <StaticValue>
                  {boundDose.vaccineName}
                  <PlanTag $paid={boundDose.plan === "paid"}>
                    {boundDose.plan === "paid" ? "自费" : "免费"}
                  </PlanTag>
                </StaticValue>
              </FormRowValue>
            ) : (
              <FormRowValue>
                <ValueInput
                  type="text"
                  placeholder="请输入疫苗名称"
                  value={vaccineName}
                  onChange={(e) => setVaccineName(e.target.value)}
                />
              </FormRowValue>
            )}
          </FormRow>

          {/* 剂次 */}
          <FormRow>
            <FormRowLabel>剂次</FormRowLabel>
            {boundDose ? (
              <FormRowValue>
                <StaticValue>
                  第{boundDose.dose}剂 / 共{boundDose.totalDose}剂
                </StaticValue>
              </FormRowValue>
            ) : (
              <FormRowValue>
                <ValueInput
                  type="number"
                  placeholder="第几剂（选填）"
                  value={doseText}
                  onChange={(e) => setDoseText(e.target.value)}
                />
                <ValueUnit>剂</ValueUnit>
              </FormRowValue>
            )}
          </FormRow>

          {/* 接种单位 */}
          <FormRow>
            <FormRowLabel>接种单位</FormRowLabel>
            <FormRowValue>
              <ValueInput
                type="text"
                placeholder="如：社区接种点（选填）"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
              />
            </FormRowValue>
          </FormRow>

          {/* 疫苗批号 */}
          <FormRow>
            <FormRowLabel>疫苗批号</FormRowLabel>
            <FormRowValue>
              <ValueInput
                type="text"
                placeholder="见预防接种证（选填）"
                value={batchNo}
                onChange={(e) => setBatchNo(e.target.value)}
              />
            </FormRowValue>
          </FormRow>

          {/* 费用（自费或自由补录时显示） */}
          {showFee && (
            <FormRow>
              <FormRowLabel>费用</FormRowLabel>
              <FormRowValue>
                <ValueInput
                  type="number"
                  placeholder="请输入"
                  value={feeText}
                  onChange={(e) => setFeeText(e.target.value)}
                />
                <ValueUnit>元</ValueUnit>
              </FormRowValue>
            </FormRow>
          )}

          {/* 备注 */}
          <FormRow>
            <FormRowLabel>备注</FormRowLabel>
            <FormRowValue>
              <TextArea
                placeholder="接种后反应等情况（选填）"
                maxLength={100}
                rows={2}
                value={note}
                onChange={(val) => setNote(val)}
              />
            </FormRowValue>
          </FormRow>

          {/* 编辑模式：删除记录 */}
          {isEdit && currentRecord && (
            <DeleteBtn onClick={() => onDelete(currentRecord.id)}>
              删除该记录
            </DeleteBtn>
          )}
        </AddRecordPopup>
      </Popup>

      {/* 接种日期选择器（最早10年前 ~ 今天） */}
      <DatePicker
        title="选择接种日期"
        type="date"
        showChinese
        visible={datePickerVisible}
        startDate={EARLIEST_DATE}
        endDate={new Date()}
        value={date}
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
        onClose={() => setDatePickerVisible(false)}
      />
    </>
  );
}

export default AddRecord;
