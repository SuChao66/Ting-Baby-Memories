import styled from "styled-components";
import { vw } from "@/utils";

/** 弹窗内容容器 */
export const AddRecordPopup = styled.div`
  padding: ${vw(16)} ${vw(20)} ${vw(28)};
`;

/** 顶部导航行：取消 / 标题 / 保存 */
export const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${vw(8)};
`;

export const HeaderCancel = styled.div`
  color: #9c9c9c;
  font-size: ${vw(14)};
  cursor: pointer;
`;

export const HeaderTitle = styled.div`
  font-size: ${vw(16)};
  font-weight: 600;
  color: #2d2d2d;
`;

export const HeaderSave = styled.div`
  color: #ff6b8a;
  font-size: ${vw(14)};
  font-weight: 600;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;

/** 表单行 */
export const FormRow = styled.div`
  display: flex;
  align-items: flex-start;
  min-height: ${vw(48)};
  padding: ${vw(10)} 0;
  border-bottom: ${vw(1)} solid #f5f5f5;

  &:last-of-type {
    border-bottom: none;
  }
`;

export const FormRowLabel = styled.div`
  width: ${vw(84)};
  flex-shrink: 0;
  padding-top: ${vw(8)};
  color: #2d2d2d;
  font-size: ${vw(14)};
`;

export const FormRowValue = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: ${vw(4)};
  padding-top: ${vw(2)};
`;

/** 只读展示值 */
export const StaticValue = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(6)};
  color: #2d2d2d;
  font-size: ${vw(14)};
`;

/** 免费/自费标记 */
export const PlanTag = styled.span<{ $paid: boolean }>`
  padding: ${vw(1)} ${vw(6)};
  border-radius: ${vw(6)};
  font-size: ${vw(10)};
  color: ${({ $paid }) => ($paid ? "#FFA940" : "#00B578")};
  background: ${({ $paid }) =>
    $paid ? "rgba(255, 169, 64, 0.12)" : "rgba(0, 181, 120, 0.1)"};
`;

/** 输入框（覆盖默认样式，贴合行布局） */
export const ValueInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  text-align: right;
  color: #2d2d2d;
  font-size: ${vw(14)};

  &::placeholder {
    color: #ccc;
  }
`;

/** 数值单位 */
export const ValueUnit = styled.span`
  flex-shrink: 0;
  color: #9c9c9c;
  font-size: ${vw(13)};
`;

/** 删除记录按钮 */
export const DeleteBtn = styled.div`
  margin-top: ${vw(16)};
  text-align: center;
  padding: ${vw(10)} 0;
  border-radius: ${vw(20)};
  border: ${vw(1)} solid rgba(250, 81, 81, 0.4);
  color: #fa5151;
  font-size: ${vw(14)};
  cursor: pointer;

  &:active {
    background: rgba(250, 81, 81, 0.06);
  }
`;
