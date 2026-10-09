import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 大事记容器 */
export const MileStoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: hidden;
  /* background-color: #ffffff; */
  /* border-radius: ${vw(8)}; */
  margin: ${vw(12)} ${vw(0)};
`;

/* ========== 大事记卡片列表 ========== */

/** 列表滚动区域 */
export const MilestoneList = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

/** 加载更多提示 */
export const LoadMoreTip = styled.p`
  text-align: center;
  font-size: ${vw(12)};
  color: #9c9c9c;
  padding: ${vw(4)} 0;
  margin: 0;
`;

/* ========== 导航栏右侧添加按钮 ========== */
export const AddButton = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${vw(2)} ${vw(12)};
  border-radius: ${vw(16)};
  background: #f97e93;
  color: #fff;
  font-size: ${vw(14)};
  cursor: pointer;

  &:active {
    opacity: 0.85;
  }
`;
