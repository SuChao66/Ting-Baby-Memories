import styled from "styled-components";
import { vw } from "@/utils";

/** 记录卡片 */
export const Card = styled.div`
  background: #fff;
  border-radius: ${vw(12)};
  padding: ${vw(12)} ${vw(12)};
`;

/** 卡片头部：日期 + 更多操作 */
export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${vw(10)};
  border-bottom: ${vw(1)} solid #f5f5f5;
`;

/** 日期文案 */
export const DateText = styled.div`
  font-size: ${vw(15)};
  font-weight: 600;
  color: #000000e0;
`;

/** 更多操作按钮 */
export const MoreBtn = styled.div`
  display: flex;
  align-items: center;
  padding: ${vw(4)};
  color: #bfbfbf;
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
`;

/** 更多操作按钮容器（相对定位，承载下拉菜单） */
export const MoreBtnWrap = styled.div`
  position: relative;
`;

/** 下拉菜单 */
export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: ${vw(4)};
  background: #fff;
  border-radius: ${vw(8)};
  box-shadow: 0 ${vw(2)} ${vw(12)} rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 100;
  min-width: ${vw(80)};
`;

/** 下拉菜单项 */
export const DropdownItem = styled.div<{ $danger?: boolean }>`
  padding: ${vw(10)} ${vw(16)};
  font-size: ${vw(14)};
  color: ${({ $danger }) => ($danger ? "#ff4d4f" : "#000000e0")};
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  gap: ${vw(4)};

  &:active {
    background: #f5f5f5;
  }

  & + & {
    border-top: ${vw(1)} solid #f5f5f5;
  }
`;

/** 三列数据网格 */
export const Grid = styled.div`
  display: flex;
  padding-top: ${vw(12)};
`;

/** 单列数据 */
export const Cell = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(6)};
`;

/** 列标题 */
export const CellTitle = styled.div`
  font-size: ${vw(14)};
  color: #00000073;
`;

/** 列数值（无数据时弱化展示） */
export const CellValue = styled.div<{ $empty?: boolean }>`
  font-size: ${vw(24)};
  font-weight: 600;
  color: ${({ $empty }) => ($empty ? "#00000040" : "#000000e0")};
`;
