import styled from "styled-components";
import { vw } from "@/utils";

/** 身高体重容器 */
export const HeightWeightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

/** 导航栏"添加"按钮 */
export const AddBtn = styled.div`
  padding: ${vw(4)} ${vw(14)};
  border-radius: ${vw(14)};
  background: #ff6b8a;
  color: #fff;
  font-size: ${vw(14)};
  cursor: pointer;

  &:active {
    opacity: 0.85;
  }
`;

/** 页签栏：记录列表 / 身高曲线 / 体重曲线 / 头围曲线 */
export const TabBar = styled.div`
  display: flex;
`;

/** 页签项 */
export const TabItem = styled.div<{ $active: boolean }>`
  flex: 1;
  text-align: center;
  position: relative;
  padding: ${vw(6)} 0;
  font-size: ${vw(15)};
  color: ${({ $active }) => ($active ? "#ff6b8a" : "#9c9c9c")};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
  transition: color 0.2s;

  /* 选中态下划线 */
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: ${vw(20)};
    height: ${vw(3)};
    border-radius: ${vw(2)};
    background: #ff6b8a;
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 0.2s;
  }
`;

/** 记录列表滚动区域 */
export const RecordList = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: ${vw(12)} 0;
  display: flex;
  flex-direction: column;
  gap: ${vw(12)};
  &::-webkit-scrollbar {
    display: none;
  }
`;

/** 图表容器 */
export const ChartWrap = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  &::-webkit-scrollbar {
    display: none;
  }
`;
