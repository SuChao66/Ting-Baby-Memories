import styled from "styled-components";
import { vw } from "@/utils";

/** 添加记录弹层容器 */
export const AddRecordPopup = styled.div`
  background: #f7f7f7;
  border-radius: ${vw(12)} ${vw(12)} 0 0;
`;

/** 顶部导航栏 */
export const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${vw(44)};
  padding: ${vw(8)} ${vw(16)};
  background: #fff;
  font-size: ${vw(14)};
  border-radius: ${vw(12)} ${vw(12)} 0 0;
`;

export const HeaderCancel = styled.span`
  color: #999;
  font-size: ${vw(14)};
  cursor: pointer;
`;

export const HeaderTitle = styled.span`
  color: #222;
  font-weight: 500;
  font-size: ${vw(16)};
`;

export const HeaderSave = styled.span`
  color: #ff6b8a;
  font-size: ${vw(14)};
  cursor: pointer;
`;

/** 表单项行 */
export const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${vw(52)};
  padding: 0 ${vw(16)};
  background: #fff;
  font-size: ${vw(14)};
`;

export const FormRowLabel = styled.span`
  color: #333;
  font-size: ${vw(16)};
`;

export const FormRowValue = styled.div`
  display: flex;
  align-items: center;
  color: #999;
  font-size: ${vw(14)};
  gap: ${vw(4)};
`;

/** 分段区块 */
export const Section = styled.div`
  background: #fff;
  margin: ${vw(12)} ${vw(0)};
`;

/** 区块标题行（含右侧切换） */
export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${vw(52)};
  padding: 0 ${vw(16)};
`;

export const SectionTitle = styled.span`
  color: #333;
  font-size: ${vw(16)};
  font-weight: 500;
`;

/** 模式切换（胶囊 tab） */
export const ModeTabs = styled.div`
  display: flex;
  background: #f5f5f5;
  border-radius: ${vw(20)};
  padding: ${vw(3)};
`;

export const ModeTab = styled.div<{ $active: boolean }>`
  padding: ${vw(6)} ${vw(16)};
  border-radius: ${vw(18)};
  font-size: ${vw(13)};
  color: ${(props) => (props.$active ? "#333" : "#999")};
  background: ${(props) => (props.$active ? "#fff" : "transparent")};
  font-weight: ${(props) => (props.$active ? "500" : "400")};
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${(props) =>
    props.$active ? "0 1px 3px rgba(0,0,0,0.08)" : "none"};
`;

/** 亲喂计时区 */
export const TimerArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${vw(24)};
  padding: ${vw(20)} ${vw(24)} ${vw(24)};
`;

export const TimerColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(16)};
`;

export const TimerText = styled.div`
  font-size: ${vw(20)};
  font-weight: 500;
  color: #333;
  font-variant-numeric: tabular-nums;
`;

export const TimerBtn = styled.div<{ $active: boolean }>`
  width: 100%;
  height: ${vw(50)};
  border-radius: ${vw(40)};
  border: ${vw(1)} solid #ff6b8a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${vw(16)};
  color: #ff6b8a;
  font-weight: 500;
  background: ${(props) =>
    props.$active ? "rgba(255, 107, 138, 0.08)" : "transparent"};
  cursor: pointer;
  transition: all 0.2s;
`;

/** 预估奶量提示 */
export const EstimateHint = styled.div`
  text-align: center;
  color: #999;
  font-size: ${vw(14)};
  padding: ${vw(12)} 0 ${vw(16)};
  cursor: pointer;
`;

/** 手动输入列表行 */
export const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${vw(52)};
  padding: 0 ${vw(16)};
  margin-left: ${vw(24)};
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const InputLabel = styled.span`
  color: #333;
  font-size: ${vw(16)};
`;

export const InputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(6)};
`;

export const InputField = styled.input`
  width: ${vw(80)};
  text-align: right;
  font-size: ${vw(15)};
  color: #333;
  border: none;
  outline: none;
  background: transparent;

  &::placeholder {
    color: #bbb;
  }
`;

export const InputUnit = styled.span`
  color: #333;
  font-size: ${vw(14)};
`;

/** 最后使用选择 */
export const LastUsedRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${vw(12)} ${vw(16)};
  margin-left: ${vw(24)};
  border-bottom: 1px solid #f0f0f0;
`;

export const LastUsedLabel = styled.span`
  color: #333;
  font-size: ${vw(16)};
`;

export const LastUsedOptions = styled.div`
  display: flex;
  gap: ${vw(12)};
`;

export const LastUsedOption = styled.div<{ $active: boolean }>`
  min-width: ${vw(60)};
  text-align: center;
  padding: ${vw(6)} ${vw(16)};
  border-radius: ${vw(20)};
  font-size: ${vw(14)};
  color: ${(props) => (props.$active ? "#fff" : "#666")};
  background: ${(props) => (props.$active ? "#ff6b8a" : "#f5f5f5")};
  cursor: pointer;
  transition: all 0.2s;
`;

/** 瓶喂输入行（无缩进） */
export const BottleInputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${vw(52)};
  padding: 0 ${vw(16)};
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const BottleInputLabel = styled.span`
  color: #333;
  font-size: ${vw(16)};
  margin-left: ${vw(24)};
`;

/** 备注区域 */
export const RemarkSection = styled.div`
  margin-top: ${vw(10)};
  background: #fff;
  padding: ${vw(16)};
`;

export const RemarkLabel = styled.div`
  color: #333;
  font-size: ${vw(15)};
  margin-bottom: ${vw(12)};
`;

export const RemarkTextarea = styled.textarea`
  width: 100%;
  min-height: ${vw(80)};
  padding: ${vw(12)};
  border: none;
  outline: none;
  background: #f7f7f7;
  border-radius: ${vw(8)};
  font-size: ${vw(14)};
  color: #333;
  resize: none;
  box-sizing: border-box;
  font-family: inherit;

  &::placeholder {
    color: #bbb;
  }
`;
