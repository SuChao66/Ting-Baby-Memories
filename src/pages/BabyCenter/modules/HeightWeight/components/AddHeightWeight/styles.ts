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
  padding: ${vw(8)} ${vw(16)};
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

/** 数值输入框 */
export const ValueInput = styled.input`
  width: ${vw(120)};
  text-align: right;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${vw(14)};
  color: #666;

  &::placeholder {
    color: #bbb;
  }
`;

/** 数值单位 */
export const ValueUnit = styled.span`
  color: #999;
  font-size: ${vw(14)};
  margin-left: ${vw(4)};
`;
