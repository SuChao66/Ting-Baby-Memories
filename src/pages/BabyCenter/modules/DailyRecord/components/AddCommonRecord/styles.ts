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

/** 切换标签 */
export const TabSwitch = styled.div`
  display: flex;
  background: #f5f5f5;
  width: 100%;
  border-radius: ${vw(20)};
  padding: ${vw(6)};
  display: flex;
  justify-content: flex-end;
`;

export const TabItem = styled.div<{ $active: boolean }>`
  padding: ${vw(6)} ${vw(16)};
  min-width: ${vw(80)};
  text-align: center;
  border-radius: ${vw(18)};
  font-size: ${vw(12)};
  color: ${(props) => (props.$active ? "#333" : "#999")};
  background: ${(props) => (props.$active ? "#fff" : "transparent")};
  cursor: pointer;
  box-shadow: ${(props) =>
    props.$active ? "0 2px 8px rgba(0,0,0,0.06)" : "none"};
`;

/** 计时区域 */
export const TimerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${vw(40)} ${vw(20)};
  background: #fff;
`;

export const TimerText = styled.div`
  font-size: ${vw(20)};
  font-weight: 500;
  color: #333;
  letter-spacing: ${vw(2)};
  margin-bottom: ${vw(32)};
`;

export const TimerButton = styled.div<{ $running: boolean }>`
  padding: ${vw(12)} ${vw(64)};
  border-radius: ${vw(32)};
  border: 1px solid #ff6b8a;
  color: #ff6b8a;
  font-size: ${vw(18)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
`;

/** 手动输入区域 */
export const ManualSection = styled.div`
  padding: ${vw(16)};
  background: #fff;
`;

export const ManualRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${vw(48)};
  font-size: ${vw(14)};
  color: #333;
`;

export const ManualInput = styled.input`
  flex: 1;
  text-align: right;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${vw(14)};
  color: #666;
`;

/** 备注区域 */
export const RemarkSection = styled.div`
  margin-top: ${vw(12)};
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

/** 辅食重量输入框 */
export const WeightInput = styled.input`
  width: ${vw(120)};
  text-align: right;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${vw(14)};
  color: #666;
`;

/** 重量单位 */
export const WeightUnit = styled.span`
  color: #999;
  font-size: ${vw(14)};
  margin-left: ${vw(4)};
`;
