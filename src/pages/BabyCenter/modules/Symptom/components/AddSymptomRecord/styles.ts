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
  min-height: ${vw(52)};
  padding: ${vw(8)} ${vw(16)};
  background: #fff;
  font-size: ${vw(14)};
`;

export const FormRowLabel = styled.span`
  color: #333;
  font-size: ${vw(16)};
  flex-shrink: 0;
`;

export const FormRowValue = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #999;
  font-size: ${vw(14)};
  gap: ${vw(4)};
`;

/** 文本输入 */
export const TextInput = styled.input`
  flex: 1;
  text-align: right;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${vw(14)};
  color: #666;
`;

/** 体温输入框 */
export const TempInput = styled.input`
  width: ${vw(120)};
  text-align: right;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${vw(14)};
  color: #666;
`;

/** 体温单位 */
export const TempUnit = styled.span`
  color: #999;
  font-size: ${vw(14)};
  margin-left: ${vw(4)};
`;

/** 症状多选区域 */
export const SymptomSection = styled.div`
  padding: ${vw(12)} ${vw(16)} ${vw(16)};
  background: #fff;
`;

export const SymptomLabel = styled.div`
  color: #333;
  font-size: ${vw(15)};
  margin-bottom: ${vw(12)};
`;

export const SymptomChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${vw(10)};
`;

export const SymptomChip = styled.div<{ $active: boolean }>`
  padding: ${vw(6)} ${vw(16)};
  border-radius: ${vw(16)};
  font-size: ${vw(13)};
  color: ${(props) => (props.$active ? "#ff6b8a" : "#666")};
  background: ${(props) => (props.$active ? "#fff0f3" : "#f5f5f5")};
  border: 1px solid ${(props) => (props.$active ? "#ff6b8a" : "transparent")};
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
`;

/** 备注区域 */
export const RemarkSection = styled.div`
  margin-top: ${vw(12)};
  background: #fff;
  padding: ${vw(16)};
`;

export const SectionLabel = styled.div`
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
