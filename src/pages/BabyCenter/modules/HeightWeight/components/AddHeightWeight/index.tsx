import { useState, useEffect } from "react";
// 导入图标
import { AiOutlineRight } from "react-icons/ai";
// 导入工具函数
import { vw, formatDay } from "@/utils";
// 导入类型
import type { PickerOptions, PickerValue } from "@nutui/nutui-react";
import type {
  IAddHeightWeightParams,
  IHeightWeightItem,
} from "@/interface/heightWeight";
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
} from "./styles";
// 导入store
import { useHeightWeightStore } from "@/store";

interface IProps {
  /** 宝宝id */
  babyId: string;
  /** 是否显示 */
  visible: boolean;
  /** 当前编辑记录（不传则为新增模式） */
  currentRecord?: IHeightWeightItem;
  /** 关闭回调 */
  onClose: () => void;
  /** 获取数据 */
  onGetData: () => void;
}

// 日期可选的最早时间（往前追溯10年，覆盖婴儿期记录）
const EARLIEST_DATE = new Date(
  new Date().setFullYear(new Date().getFullYear() - 10),
);

// 将日期字符串解析为本地时区 Date 对象（避免 UTC 偏移）
function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("T")[0].split("-").map(Number);
  return new Date(y, m - 1, d);
}

function AddHeightWeight(props: IProps) {
  const { babyId, visible, currentRecord, onClose, onGetData } = props;

  const { addHeightWeight, editHeightWeight } = useHeightWeightStore(
    (state) => state,
  );

  // 是否编辑
  const isEdit = !!currentRecord;
  // 记录日期（默认今天）
  const [date, setDate] = useState<Date>(new Date());
  // 身高/体重/头围
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [head, setHead] = useState<string>("");
  // 日期选择器显示
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  // 弹窗打开时重置/填充表单
  useEffect(() => {
    if (!visible) return;
    if (currentRecord) {
      // 编辑模式：填充已有数据
      setDate(parseLocalDate(currentRecord.date));
      setHeight(currentRecord.height != null ? String(currentRecord.height) : "");
      setWeight(currentRecord.weight != null ? String(currentRecord.weight) : "");
      setHead(currentRecord.head != null ? String(currentRecord.head) : "");
    } else {
      // 新增模式：重置为默认值
      setDate(new Date());
      setHeight("");
      setWeight("");
      setHead("");
    }
    setDatePickerVisible(false);
  }, [visible, currentRecord]);

  // 选择记录日期（最早10年前，最晚今天）
  const handleDateConfirm = (
    _options: PickerOptions,
    values: PickerValue[],
  ) => {
    const [Y, M, D] = values.map(Number);
    if ([Y, M, D].some((v) => Number.isNaN(v))) return;
    setDate(new Date(Y, M - 1, D));
    setDatePickerVisible(false);
  };

  // 保存
  const handleSave = async () => {
    const baseParams: IAddHeightWeightParams = {
      date: formatDay(date),
      babyId,
    };
    // 收集已填写的数值项，校验必须大于0
    const numFields = [
      { key: "height" as const, value: height },
      { key: "weight" as const, value: weight },
      { key: "head" as const, value: head },
    ];
    for (const { key, value } of numFields) {
      if (value === "") continue;
      const num = Number(value);
      if (Number.isNaN(num) || num <= 0) {
        Toast.show({
          title: "请输入大于0的数值",
          icon: "warn",
        });
        return;
      }
      baseParams[key] = num;
    }
    // 身高/体重/头围至少填写一项
    if (baseParams.height === undefined && baseParams.weight === undefined) {
      Toast.show({
        title: "身高和体重至少填写一项数据",
        icon: "warn",
      });
      return;
    }
    // 编辑模式需携带记录 id
    const ok = isEdit
      ? await editHeightWeight({ ...baseParams, id: currentRecord!._id })
      : await addHeightWeight(baseParams);
    if (ok) {
      Toast.show({ title: "保存成功" });
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
        closeOnOverlayClick={false}
        onClose={onClose}
      >
        <AddRecordPopup>
          {/* 顶部导航 */}
          <PopupHeader>
            <HeaderCancel onClick={onClose}>取消</HeaderCancel>
            <HeaderTitle>
              {isEdit ? "编辑身高体重" : "新增身高体重"}
            </HeaderTitle>
            <HeaderSave onClick={handleSave}>保存</HeaderSave>
          </PopupHeader>

          {/* 记录日期 */}
          <FormRow>
            <FormRowLabel>日期</FormRowLabel>
            <FormRowValue onClick={() => setDatePickerVisible(true)}>
              <span>{formatDay(date)}</span>
              <AiOutlineRight size={vw(14)} color="#ccc" />
            </FormRowValue>
          </FormRow>

          {/* 身高 */}
          <FormRow>
            <FormRowLabel>身高</FormRowLabel>
            <FormRowValue>
              <ValueInput
                type="number"
                placeholder="请输入"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <ValueUnit>cm</ValueUnit>
            </FormRowValue>
          </FormRow>

          {/* 体重 */}
          <FormRow>
            <FormRowLabel>体重</FormRowLabel>
            <FormRowValue>
              <ValueInput
                type="number"
                placeholder="请输入"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <ValueUnit>kg</ValueUnit>
            </FormRowValue>
          </FormRow>

          {/* 头围 */}
          <FormRow>
            <FormRowLabel>头围</FormRowLabel>
            <FormRowValue>
              <ValueInput
                type="number"
                placeholder="请输入"
                value={head}
                onChange={(e) => setHead(e.target.value)}
              />
              <ValueUnit>cm</ValueUnit>
            </FormRowValue>
          </FormRow>
        </AddRecordPopup>
      </Popup>

      {/* 记录日期选择器（最早10年前 ~ 今天） */}
      <DatePicker
        title="选择日期"
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

export default AddHeightWeight;
