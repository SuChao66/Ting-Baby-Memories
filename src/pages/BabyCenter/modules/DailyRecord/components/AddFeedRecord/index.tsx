import { useState, useEffect, useRef, useCallback } from "react";
// 导入图标
import { AiOutlineRight } from "react-icons/ai";
// 导入工具函数
import { vw, formatDateTime, formatSeconds } from "@/utils";
// 导入常量
import { DAILY_RECORD_TYPES, TIME_UNIT } from "@/enums";
import {
  BREAST_FEED_MODE,
  BREAST_SIDE,
  BOTTLE_MILK_TYPE,
  bottleMilkTypeOptions,
} from "../../constants";
// 导入配置
import { recordTypeConfig } from "../../actionConfig";
/// 导入store
import { useDailyRecordStore } from "@/store";
// 导入类型
import type { DailyRecordType } from "@/types";
import type { PickerOptions, PickerValue } from "@nutui/nutui-react";
import type { IGetDailyRecordItem } from "@/interface/dailyRecord";
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
  Section,
  SectionHeader,
  SectionTitle,
  ModeTabs,
  ModeTab,
  TimerArea,
  TimerColumn,
  TimerText,
  TimerBtn,
  EstimateHint,
  InputRow,
  InputLabel,
  InputWrap,
  InputField,
  InputUnit,
  LastUsedRow,
  LastUsedLabel,
  LastUsedOptions,
  LastUsedOption,
  BottleInputRow,
  BottleInputLabel,
  RemarkSection,
  RemarkLabel,
  RemarkTextarea,
} from "./styles";

interface AddFeedRecordProps {
  /** babyId */
  babyId: string;
  /** 记录类型 */
  type: DailyRecordType;
  /** 是否显示 */
  visible: boolean;
  /** 编辑记录 */
  currentRecord: IGetDailyRecordItem | null;
  /** 关闭回调 */
  onClose: () => void;
  /** 获取数据 */
  onGetData: () => void;
}

function AddFeedRecord(props: AddFeedRecordProps) {
  const { babyId, type, visible, currentRecord, onClose, onGetData } = props;
  const { addDailyRecord, editDailyRecord } = useDailyRecordStore(
    (state) => state,
  );
  // 弹窗标题
  const { title, editTitle } = recordTypeConfig[DAILY_RECORD_TYPES.DIAPER];

  // 开始时间
  const [startDateTime, setStartDateTime] = useState(new Date());
  // 时间选择器显示状态
  const [startPickerVisible, setStartPickerVisible] = useState(false);

  // 亲喂模式
  const [breastMode, setBreastMode] = useState<string>(BREAST_FEED_MODE.TIMER);

  // 计时状态
  const [leftSeconds, setLeftSeconds] = useState(0);
  const [rightSeconds, setRightSeconds] = useState(0);
  const [activeSide, setActiveSide] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 手动输入
  const [leftMinutes, setLeftMinutes] = useState<number | string>("");
  const [rightMinutes, setRightMinutes] = useState<number | string>("");
  const [lastUsedSide, setLastUsedSide] = useState<string>(BREAST_SIDE.LEFT);

  // 预估奶量
  const [showEstimate, setShowEstimate] = useState(false);
  const [estimatedAmount, setEstimatedAmount] = useState<number | string>("");

  // 瓶喂
  const [formulaAmount, setFormulaAmount] = useState<number | string>(""); // 配方奶
  const [breastMilkAmount, setBreastMilkAmount] = useState<number | string>(""); // 母乳

  // 备注
  const [remark, setRemark] = useState("");

  // 启动/停止计时
  const toggleTimer = useCallback(
    (side: string) => {
      if (activeSide === side) {
        // 暂停
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setActiveSide(null);
      } else {
        // 切换或开始：先停旧的
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setActiveSide(side);
        timerRef.current = setInterval(() => {
          if (side === BREAST_SIDE.LEFT) {
            setLeftSeconds((s) => s + 1);
          } else {
            setRightSeconds((s) => s + 1);
          }
        }, 1000);
      }
    },
    [activeSide],
  );

  // 弹窗打开重置
  useEffect(() => {
    if (visible) {
      // 根据currentRecord判断是编辑还是新增
      const isEdit = currentRecord !== null;
      setStartPickerVisible(false);
      setStartDateTime(isEdit ? new Date(currentRecord.startTime) : new Date());
      setBreastMode(isEdit ? currentRecord.breastMode : BREAST_FEED_MODE.TIMER);
      setLeftSeconds(
        isEdit
          ? currentRecord.breastMode === BREAST_FEED_MODE.TIMER
            ? currentRecord.leftDuration
            : 0
          : 0,
      );
      setRightSeconds(
        isEdit
          ? currentRecord.breastMode === BREAST_FEED_MODE.TIMER
            ? currentRecord.rightDuration
            : 0
          : 0,
      );
      setActiveSide(null);
      setLeftMinutes(
        isEdit
          ? currentRecord.breastMode === BREAST_FEED_MODE.MANUAL
            ? Math.round(currentRecord.leftDuration / TIME_UNIT)
            : ""
          : "",
      );
      setRightMinutes(
        isEdit
          ? currentRecord.breastMode === BREAST_FEED_MODE.MANUAL
            ? Math.round(currentRecord.rightDuration / TIME_UNIT)
            : ""
          : "",
      );
      setLastUsedSide(isEdit ? currentRecord.lastUsedSide : BREAST_SIDE.LEFT);
      setShowEstimate(currentRecord?.estimatedAmount ? true : false);
      setEstimatedAmount(isEdit ? currentRecord.estimatedAmount : "");
      setFormulaAmount(isEdit ? currentRecord.formulaAmount : "");
      setBreastMilkAmount(isEdit ? currentRecord.breastMilkAmount : "");
      setRemark(isEdit ? currentRecord.remark : "");
    } else if (timerRef.current) {
      // 关闭弹窗时停止计时，避免计时器后台空转
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [visible]);

  // 组件卸载清理，清除定时器，防止内存泄露
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

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
    // 计时方式需要转化为分钟
    const leftDur =
      breastMode === BREAST_FEED_MODE.TIMER
        ? Math.round(leftSeconds)
        : Number(leftMinutes) * TIME_UNIT || 0;
    const rightDur =
      breastMode === BREAST_FEED_MODE.TIMER
        ? Math.round(rightSeconds)
        : Number(rightMinutes) * TIME_UNIT || 0;
    const formula = Number(formulaAmount) || 0;
    const breastMilk = Number(breastMilkAmount) || 0;
    // 参数校验：亲喂时长与瓶喂奶量至少填写一项
    if (!leftDur && !rightDur && !formula && !breastMilk) {
      Toast.show({
        title: "请填写亲喂时长或瓶喂奶量！",
        icon: "warn",
      });
      return;
    }
    const params = {
      babyId,
      type,
      startTime: startDateTime, // 开始时间
      breastMode,
      leftDuration: leftDur, // 左侧亲喂时长
      rightDuration: rightDur, // 右侧亲喂时长
      lastUsedSide, // 上一次使用的左侧还是右侧
      estimatedAmount: Number(estimatedAmount) || 0, // 预估奶量
      formulaAmount: formula, // 配方奶奶量
      breastMilkAmount: breastMilk, // 母乳奶量
      remark, // 评价
    };
    const isEdit = currentRecord !== null;
    if (isEdit) {
      params["id"] = currentRecord._id;
    }
    const requestMethod = isEdit ? editDailyRecord : addDailyRecord;
    const ok = await requestMethod(params);
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
        minHeight="80%"
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

          {/* 开始时间行 */}
          <FormRow>
            <FormRowLabel>开始时间</FormRowLabel>
            <FormRowValue onClick={() => setStartPickerVisible(true)}>
              <span>{formatDateTime(startDateTime)}</span>
              <AiOutlineRight size={vw(14)} color="#ccc" />
            </FormRowValue>
          </FormRow>

          {/* 亲喂区 */}
          <Section>
            <SectionHeader>
              <SectionTitle>亲喂</SectionTitle>
              <ModeTabs>
                <ModeTab
                  $active={breastMode === BREAST_FEED_MODE.TIMER}
                  onClick={() => setBreastMode(BREAST_FEED_MODE.TIMER)}
                >
                  计时
                </ModeTab>
                <ModeTab
                  $active={breastMode === BREAST_FEED_MODE.MANUAL}
                  onClick={() => setBreastMode(BREAST_FEED_MODE.MANUAL)}
                >
                  手动输入
                </ModeTab>
              </ModeTabs>
            </SectionHeader>

            {/* 计时模式 */}
            {breastMode === BREAST_FEED_MODE.TIMER && (
              <>
                <TimerArea>
                  <TimerColumn>
                    <TimerText>{formatSeconds(leftSeconds)}</TimerText>
                    <TimerBtn
                      $active={activeSide === BREAST_SIDE.LEFT}
                      onClick={() => toggleTimer(BREAST_SIDE.LEFT)}
                    >
                      左侧喂
                    </TimerBtn>
                  </TimerColumn>
                  <TimerColumn>
                    <TimerText>{formatSeconds(rightSeconds)}</TimerText>
                    <TimerBtn
                      $active={activeSide === BREAST_SIDE.RIGHT}
                      onClick={() => toggleTimer(BREAST_SIDE.RIGHT)}
                    >
                      右侧喂
                    </TimerBtn>
                  </TimerColumn>
                </TimerArea>
              </>
            )}

            {/* 手动输入模式 */}
            {breastMode === BREAST_FEED_MODE.MANUAL && (
              <>
                <InputRow>
                  <InputLabel>左</InputLabel>
                  <InputWrap>
                    <InputField
                      type="number"
                      placeholder="输入"
                      value={leftMinutes}
                      onChange={(e) => setLeftMinutes(e.target.value)}
                    />
                    <InputUnit>分钟</InputUnit>
                  </InputWrap>
                </InputRow>
                <InputRow>
                  <InputLabel>右</InputLabel>
                  <InputWrap>
                    <InputField
                      type="number"
                      placeholder="输入"
                      value={rightMinutes}
                      onChange={(e) => setRightMinutes(e.target.value)}
                    />
                    <InputUnit>分钟</InputUnit>
                  </InputWrap>
                </InputRow>
                <LastUsedRow>
                  <LastUsedLabel>最后使用</LastUsedLabel>
                  <LastUsedOptions>
                    <LastUsedOption
                      $active={lastUsedSide === BREAST_SIDE.LEFT}
                      onClick={() => setLastUsedSide(BREAST_SIDE.LEFT)}
                    >
                      左
                    </LastUsedOption>
                    <LastUsedOption
                      $active={lastUsedSide === BREAST_SIDE.RIGHT}
                      onClick={() => setLastUsedSide(BREAST_SIDE.RIGHT)}
                    >
                      右
                    </LastUsedOption>
                  </LastUsedOptions>
                </LastUsedRow>
              </>
            )}

            {/* 预估奶量（两种模式共用） */}
            <EstimateHint onClick={() => setShowEstimate(!showEstimate)}>
              {showEstimate ? "收起预估奶量" : "记录预估奶量"}
            </EstimateHint>
            {showEstimate && (
              <InputRow style={{ marginLeft: 0 }}>
                <InputLabel style={{ marginLeft: vw(16) }}>预估奶量</InputLabel>
                <InputWrap>
                  <InputField
                    type="number"
                    placeholder="输入"
                    value={estimatedAmount}
                    onChange={(e) => setEstimatedAmount(e.target.value)}
                  />
                  <InputUnit>ml</InputUnit>
                </InputWrap>
              </InputRow>
            )}
          </Section>

          {/* 瓶喂区 */}
          <Section>
            <SectionHeader>
              <SectionTitle>瓶喂</SectionTitle>
            </SectionHeader>
            {bottleMilkTypeOptions.map((item) => (
              <BottleInputRow key={item.value}>
                <BottleInputLabel>{item.label}</BottleInputLabel>
                <InputWrap>
                  <InputField
                    type="number"
                    placeholder="输入"
                    value={
                      item.value === BOTTLE_MILK_TYPE.FORMULA
                        ? formulaAmount
                        : breastMilkAmount
                    }
                    onChange={(e) => {
                      if (item.value === BOTTLE_MILK_TYPE.FORMULA) {
                        setFormulaAmount(e.target.value);
                      } else {
                        setBreastMilkAmount(e.target.value);
                      }
                    }}
                  />
                  <InputUnit>{item.unit}</InputUnit>
                </InputWrap>
              </BottleInputRow>
            ))}
          </Section>

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
        </AddRecordPopup>
      </Popup>

      {/* 开始时间选择器（一周前 ~ 当前时间） */}
      <DatePicker
        title="选择开始时间"
        type="datetime"
        showChinese
        visible={startPickerVisible}
        startDate={new Date(Date.now() - 7 * 24 * TIME_UNIT * TIME_UNIT * 1000)}
        endDate={new Date()}
        value={startDateTime}
        onConfirm={handleStartConfirm}
        onCancel={() => setStartPickerVisible(false)}
        onClose={() => setStartPickerVisible(false)}
      />
    </>
  );
}

export default AddFeedRecord;
