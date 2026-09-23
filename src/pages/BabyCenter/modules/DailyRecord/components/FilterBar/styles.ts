import styled, { keyframes } from "styled-components";
import { vw } from "@/utils";

/** 筛选栏展开动画 */
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/** 筛选栏容器 */
export const FilterBarContainer = styled.div`
  flex-shrink: 0;
  background: #fff;
  padding: ${vw(12)} ${vw(16)};
  border-radius: ${vw(12)};
  box-shadow: 0 ${vw(2)} ${vw(8)} rgba(0, 0, 0, 0.03);
  animation: ${slideDown} 0.25s ease;
`;

/** 日期筛选行 */
export const FilterDateRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(12)};
  margin-bottom: ${vw(12)};
`;

/** 日期选择按钮 */
export const FilterDateBtn = styled.div<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${vw(4)};
  padding: ${vw(5)} ${vw(14)};
  font-size: ${vw(12)};
  border-radius: ${vw(16)};
  color: ${(props) => (props.$active ? "#fff" : "#555")};
  background: ${(props) =>
    props.$active
      ? "linear-gradient(135deg, #ffb199 0%, #ff6b8a 100%)"
      : "#f5f5f5"};
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
`;

/** 恢复今天按钮（选中非今天的日期时显示） */
export const FilterResetBtn = styled.div`
  background: #f5f5f5;
  font-size: ${vw(12)};
  display: inline-flex;
  align-items: center;
  gap: ${vw(4)};
  padding: ${vw(5)} ${vw(14)};
  font-size: ${vw(12)};
  border-radius: ${vw(16)};

  &:active {
    opacity: 0.7;
  }
`;

/** 前一天按钮 */
export const FilterPrevDayBtn = styled.div`
  background: #f5f5f5;
  font-size: ${vw(12)};
  display: inline-flex;
  align-items: center;
  gap: ${vw(4)};
  padding: ${vw(5)} ${vw(14)};
  font-size: ${vw(12)};
  border-radius: ${vw(16)};
`;

/** 类型筛选横向滚动区 */
export const FilterTypeScroll = styled.div`
  display: flex;
  gap: ${vw(8)};
  overflow-x: auto;
  padding-bottom: ${vw(12)};

  &::-webkit-scrollbar {
    display: none;
  }
`;

/** 类型筛选选项 */
export const FilterChip = styled.div<{ $active: boolean }>`
  flex-shrink: 0;
  padding: ${vw(5)} ${vw(14)};
  font-size: ${vw(12)};
  border-radius: ${vw(16)};
  color: ${(props) => (props.$active ? "#fff" : "#555")};
  background: ${(props) =>
    props.$active
      ? "linear-gradient(135deg, #ffb199 0%, #ff6b8a 100%)"
      : "#f5f5f5"};
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    opacity: 0.7;
  }
`;
