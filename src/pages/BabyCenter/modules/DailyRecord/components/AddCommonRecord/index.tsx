import { useState, useRef, useEffect } from "react";
// 导入图标
import { AiOutlineRight } from "react-icons/ai";
// 导入工具函数
import { vw, formatDateTime, formatDuration } from "@/utils";
// 导入类型
import type { DailyRecordType } from "@/types";
import type { PickerOptions, PickerValue } from "@nutui/nutui-react";
// 导入常量
import { DAILY_RECORD_TYPES, NUMBER } from "@/enums";
import { BREAST_FEED_MODE } from "../../constants";
// 导入配置
import { recordTypeConfig } from "../../actionConfig";
// 导入store
import { useDailyRecordStore } from "@/store";
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
  TabSwitch,
  TabItem,
  TimerSection,
  TimerText,
  TimerButton,
  ManualSection,
  ManualRow,
  ManualInput,
  RemarkSection,
  RemarkLabel,
  RemarkTextarea,
  WeightInput,
  WeightUnit,
} from "./styles";

interface AddCommonRecordProps {
  /** babyId */
  babyId: string;
  /** 记录类型 */
  type: DailyRecordType;
  /** 是否显示 */
  visible: boolean;
  /** 关闭回调 */
  onClose: () => void;
}

function AddCommonRecord(props: AddCommonRecordProps) {
  const { babyId, type, visible, onClose } = props;
  const addDailyRecord = useDailyRecordStore((state) => state.addDailyRecord);

  // 根据类型获取标题
  const { title, actionText, continueText } = recordTypeConfig[type];

  // 输入模式：timer 计时 / manual 手动输入
  const [mode, setMode] = useState<"timer" | "manual">("timer");
  // 开始时间
  const [startDateTime, setStartDateTime] = useState(new Date());
  // 开始时间选择器显示
  const [startPickerVisible, setStartPickerVisible] = useState(false);
  // 持续时长（秒）
  const [duration, setDuration] = useState(NUMBER.ZERO);
  // 手动输入的时长（分钟）
  const [manualMinutes, setManualMinutes] = useState("");
  // 计时中
  const [running, setRunning] = useState(false);
  // 备注
  const [remark, setRemark] = useState("");
  // 事件名称（仅其他事件类型）
  const [eventName, setEventName] = useState("");
  // 辅食名称（仅辅食类型）
  const [foodName, setFoodName] = useState("");
  // 辅食重量（克，仅辅食类型）
  const [foodWeight, setFoodWeight] = useState("");

  const timerRef = useRef<number | null>(null);

  // 重置状态（弹窗打开时重置一次）
  useEffect(() => {
    if (visible) {
      setStartDateTime(new Date());
      setStartPickerVisible(false);
      setDuration(0);
      setManualMinutes("");
      setRunning(false);
      setMode("timer");
      setRemark("");
      setEventName("");
      setFoodName("");
      setFoodWeight("");
    }
  }, [visible]);

  // 计时逻辑
  useEffect(() => {
    if (running) {
      timerRef.current = window.setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } else {
      // 清除定时器
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [running]);

  // 开始/结束计时
  const toggleTimer = () => {
    setRunning(!running);
  };

  // 选择开始时间（只能选当前时间之前，最早一周前）
  const handleStartConfirm = (
    _options: PickerOptions,
    values: PickerValue[],
  ) => {
    const [Y, M, D, h, m] = values.map(Number);
    if ([Y, M, D, h, m].some((v) => Number.isNaN(v))) return;
    setStartDateTime(new Date(Y, M - 1, D, h, m));
    setStartPickerVisible(false);
  };

  // 保存
  const handleSave = async () => {
    // 对持续时间进行转换，手动输入的是分钟，需要进行转换
    const finalDuration =
      mode === BREAST_FEED_MODE.TIMER
        ? duration
        : Number(manualMinutes || NUMBER.ZERO) * NUMBER.SIXTY;
    // 对参数进行校验, 辅食
    if (type === DAILY_RECORD_TYPES.FOOD) {
      if (!foodName) {
        Toast.show({
          title: "请输入辅食名称",
          icon: "warn",
        });
        return;
      }
      if (!foodWeight) {
        Toast.show({
          title: "请输入辅食重量",
          icon: "warn",
        });
        return;
      }
    } else if (type === DAILY_RECORD_TYPES.OTHER) {
      if (!eventName) {
        Toast.show({
          title: "请输入事件名称",
          icon: "warn",
        });
        return;
      }
    } else {
      // 其他记录类型：睡眠、洗澡、玩耍、游泳
      if (finalDuration === NUMBER.ZERO) {
        Toast.show({
          title: "持续时间不能为0",
          icon: "warn",
        });
        return;
      }
    }
    const params = {
      babyId,
      type,
      // 公共参数
      startTime: startDateTime,
      duration: type === DAILY_RECORD_TYPES.FOOD ? 0 : finalDuration,
      remark,
      // 其他事件
      eventName: type === DAILY_RECORD_TYPES.OTHER ? eventName : "",
      // 辅食
      foodName: type === DAILY_RECORD_TYPES.FOOD ? foodName : "",
      foodWeight: type === DAILY_RECORD_TYPES.FOOD ? foodWeight : "",
    };
    const ok = await addDailyRecord(params);
    if (ok) {
      Toast.show({
        content: `${title}成功`,
        icon: "success",
      });
      onClose();
    }
  };

  return (
    <>
      <Popup
        visible={visible}
        position="bottom"
        round
        minHeight="80%"
        closeOnOverlayClick={false}
        onClose={onClose}
      >
        <AddRecordPopup>
          {/* 顶部导航 */}
          <PopupHeader>
            <HeaderCancel onClick={onClose}>取消</HeaderCancel>
            <HeaderTitle>{title}</HeaderTitle>
            <HeaderSave onClick={handleSave}>保存</HeaderSave>
          </PopupHeader>

          {/* 辅食类型表单：辅食名称 + 重量 */}
          {type === DAILY_RECORD_TYPES.FOOD ? (
            <>
              <FormRow>
                <FormRowLabel>辅食名称</FormRowLabel>
                <ManualInput
                  type="text"
                  placeholder="请输入辅食名称"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                />
              </FormRow>
              <FormRow>
                <FormRowLabel>重量</FormRowLabel>
                <FormRowValue>
                  <WeightInput
                    type="number"
                    placeholder="请输入"
                    value={foodWeight}
                    onChange={(e) => setFoodWeight(e.target.value)}
                  />
                  <WeightUnit>克</WeightUnit>
                </FormRowValue>
              </FormRow>
            </>
          ) : (
            <>
              {/* 事件名称（仅其他事件类型显示） */}
              {type === DAILY_RECORD_TYPES.OTHER && (
                <FormRow>
                  <FormRowLabel>事件名称</FormRowLabel>
                  <ManualInput
                    type="text"
                    placeholder="请输入事件名称"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </FormRow>
              )}

              {/* 开始时间行 */}
              <FormRow>
                <FormRowLabel>开始时间</FormRowLabel>
                <FormRowValue onClick={() => setStartPickerVisible(true)}>
                  <span>{formatDateTime(startDateTime)}</span>
                  <AiOutlineRight size={vw(14)} color="#ccc" />
                </FormRowValue>
              </FormRow>

              {/* 模式切换 */}
              <TabSwitch>
                <TabItem
                  $active={mode === "timer"}
                  onClick={() => setMode("timer")}
                >
                  计时
                </TabItem>
                <TabItem
                  $active={mode === "manual"}
                  onClick={() => setMode("manual")}
                >
                  手动输入
                </TabItem>
              </TabSwitch>

              {/* 计时模式 */}
              {mode === "timer" && (
                <TimerSection>
                  <TimerText>{formatDuration(duration)}</TimerText>
                  <TimerButton $running={running} onClick={toggleTimer}>
                    {running
                      ? "结束计时"
                      : duration > 0
                        ? continueText
                        : actionText}
                  </TimerButton>
                </TimerSection>
              )}

              {/* 手动输入模式 */}
              {mode === "manual" && (
                <ManualSection>
                  <ManualRow>
                    <span>时长（分钟）</span>
                    <ManualInput
                      type="number"
                      placeholder="请输入"
                      value={manualMinutes}
                      onChange={(e) => setManualMinutes(e.target.value)}
                    />
                  </ManualRow>
                </ManualSection>
              )}

              {/* 备注 */}
              <RemarkSection>
                <RemarkLabel>添加备注</RemarkLabel>
                <RemarkTextarea
                  placeholder="输入备注内容"
                  maxLength={200}
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
              </RemarkSection>
            </>
          )}
        </AddRecordPopup>
      </Popup>

      {/* 开始时间选择器（一周前 ~ 当前时间） */}
      <DatePicker
        title="选择开始时间"
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

export default AddCommonRecord;
