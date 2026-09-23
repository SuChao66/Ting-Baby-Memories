import { useState, useEffect } from "react";
// 导入图标
import { AiOutlineRight } from "react-icons/ai";
// 导入工具函数
import { vw, formatDateTime } from "@/utils";
// 导入常量
import { DAILY_RECORD_TYPES } from "@/enums/constants";
import {
  DIAPER_STATUS,
  diaperStatusOptions,
  poopColorOptions,
  poopShapeOptions,
  peeAmountOptions,
} from "../../constants";
// 导入配置
import { recordTypeConfig } from "../../actionConfig";
// 导入store
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
  StatusSection,
  StatusOption,
  StatusIconWrap,
  StatusImage,
  StatusCheckBadge,
  StatusText,
  OptionSection,
  OptionLabel,
  PeeGrid,
  PeeItem,
  PeeLabel,
  ShapeGrid,
  ShapeItem,
  ShapeLabel,
  ColorCheckBadge,
  ColorGrid,
  ColorItem,
  ColorDot,
  ColorLabel,
  RashRow,
  RashLabel,
  RemarkSection,
  RemarkLabel,
  RemarkTextarea,
} from "./styles";

interface AddDiaperRecordProps {
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

function AddDiaperRecord(props: AddDiaperRecordProps) {
  const { babyId, type, visible, currentRecord, onClose, onGetData } = props;
  const { addDailyRecord, editDailyRecord } = useDailyRecordStore(
    (state) => state,
  );

  // 弹窗标题
  const { title, editTitle } = recordTypeConfig[DAILY_RECORD_TYPES.DIAPER];

  // 开始时间
  const [startDateTime, setStartDateTime] = useState(new Date());
  // 开始时间选择器显示
  const [startPickerVisible, setStartPickerVisible] = useState(false);
  // 尿布状态，默认臭臭
  const [status, setStatus] = useState<string>(DIAPER_STATUS.POOP);
  // 臭臭颜色
  const [poopColor, setPoopColor] = useState("");
  // 臭臭形状
  const [poopShape, setPoopShape] = useState("");
  // 尿量
  const [peeAmount, setPeeAmount] = useState("");
  // 是否红屁股
  const [hasRash, setHasRash] = useState(false);
  // 备注
  const [remark, setRemark] = useState("");

  // 当前状态是否包含臭臭
  const showPoop =
    status === DIAPER_STATUS.POOP || status === DIAPER_STATUS.BOTH;
  // 当前状态是否包含嘘嘘
  const showPee = status === DIAPER_STATUS.PEE || status === DIAPER_STATUS.BOTH;

  // 重置状态（弹窗打开时重置一次）
  useEffect(() => {
    if (visible) {
      // 根据currentRecord判断是编辑还是新增
      const isEdit = currentRecord !== null;
      setStartDateTime(isEdit ? new Date(currentRecord.startTime) : new Date());
      setStartPickerVisible(false);
      setStatus(isEdit ? currentRecord.status : DIAPER_STATUS.POOP);
      setPoopColor(isEdit ? currentRecord.poopColor : "");
      setPoopShape(isEdit ? currentRecord.poopShape : "");
      setPeeAmount(isEdit ? currentRecord.peeAmount : "");
      setHasRash(isEdit ? currentRecord.hasRash : false);
      setRemark(isEdit ? currentRecord.remark : "");
    }
  }, [visible]);

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
    // 参数校验
    if (showPoop && !poopColor) {
      Toast.show({
        title: "请选择臭臭颜色！",
        icon: "warn",
      });
      return;
    }
    if (showPoop && !poopShape) {
      Toast.show({
        title: "请选择臭臭形状！",
        icon: "warn",
      });
      return;
    }
    if (showPee && !peeAmount) {
      Toast.show({
        title: "请选择尿量！",
        icon: "warn",
      });
      return;
    }
    const params = {
      babyId,
      type,
      startTime: startDateTime,
      status,
      poopColor: showPoop ? poopColor : undefined,
      poopShape: showPoop ? poopShape : undefined,
      peeAmount: showPee ? peeAmount : undefined,
      hasRash,
      remark,
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
            <FormRowLabel>时间</FormRowLabel>
            <FormRowValue onClick={() => setStartPickerVisible(true)}>
              <span>{formatDateTime(startDateTime)}</span>
              <AiOutlineRight size={vw(14)} color="#ccc" />
            </FormRowValue>
          </FormRow>

          {/* 尿布状态选择 */}
          <StatusSection>
            {diaperStatusOptions.map((item) => {
              const active = status === item.value;
              return (
                <StatusOption
                  key={item.value}
                  onClick={() => setStatus(item.value)}
                >
                  <StatusIconWrap $active={active}>
                    <StatusImage src={item.image} alt={item.label} />
                    {active && <StatusCheckBadge />}
                  </StatusIconWrap>
                  <StatusText $active={active} $color="#ffb3ba">
                    {item.label}
                  </StatusText>
                </StatusOption>
              );
            })}
          </StatusSection>

          {/* 臭臭颜色（状态包含臭臭时显示） */}
          {showPoop && (
            <OptionSection>
              <OptionLabel>臭臭颜色</OptionLabel>
              <ColorGrid>
                {poopColorOptions.map((item) => {
                  const active = poopColor === item.value;
                  return (
                    <ColorItem
                      key={item.value}
                      onClick={() => setPoopColor(item.value)}
                    >
                      <ColorDot $color={item.color}>
                        {active && <ColorCheckBadge />}
                      </ColorDot>
                      <ColorLabel $active={active}>{item.label}</ColorLabel>
                    </ColorItem>
                  );
                })}
              </ColorGrid>
            </OptionSection>
          )}

          {/* 臭臭形状（状态包含臭臭时显示，带图片说明） */}
          {showPoop && (
            <OptionSection>
              <OptionLabel>臭臭形状</OptionLabel>
              <ShapeGrid>
                {poopShapeOptions.map((item) => {
                  const active = poopShape === item.value;
                  return (
                    <ShapeItem
                      key={item.value}
                      $active={active}
                      onClick={() => setPoopShape(item.value)}
                    >
                      <StatusIconWrap $active={active}>
                        <StatusImage src={item.image} alt={item.label} />
                        {active && <StatusCheckBadge />}
                      </StatusIconWrap>
                      <ShapeLabel $active={active}>{item.label}</ShapeLabel>
                    </ShapeItem>
                  );
                })}
              </ShapeGrid>
            </OptionSection>
          )}

          {/* 尿量（状态包含嘘嘘时显示，带图片说明） */}
          {showPee && (
            <OptionSection>
              <OptionLabel>尿量</OptionLabel>
              <PeeGrid>
                {peeAmountOptions.map((item) => {
                  const active = peeAmount === item.value;
                  return (
                    <PeeItem
                      key={item.value}
                      onClick={() => setPeeAmount(item.value)}
                    >
                      <StatusIconWrap $active={active}>
                        <StatusImage src={item.image} alt={item.label} />
                        {active && <StatusCheckBadge />}
                      </StatusIconWrap>
                      <PeeLabel $active={active}>{item.label}</PeeLabel>
                    </PeeItem>
                  );
                })}
              </PeeGrid>
            </OptionSection>
          )}

          {/* 是否红屁股 */}
          <RashRow>
            <RashLabel>是否有红屁股</RashLabel>
            <Switch checked={hasRash} onChange={(v) => setHasRash(v)} />
          </RashRow>

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
        title="选择时间"
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

export default AddDiaperRecord;
