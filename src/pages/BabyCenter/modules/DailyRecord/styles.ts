import styled from "styled-components";
import { vw } from "@/utils";

/** 吃喝拉撒睡容器 */
export const DailyRecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
`;

/** 吃喝拉撒睡列表  */
export const DailyRecordList = styled.div<{ $height: number, $filterBarHeight: number }>`
  height: ${(props) => `calc(100% - ${vw(props.$height + props.$filterBarHeight + 20)})`};
  overflow: auto;
`;

/* ========== 筛选 ========== */

/** 导航栏筛选入口按钮 */
export const FilterEntryBtn = styled.div<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${vw(2)};
  font-size: ${vw(12)};
  color: ${(props) => (props.$active ? "#ff6b8a" : "#666")};
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
`;
