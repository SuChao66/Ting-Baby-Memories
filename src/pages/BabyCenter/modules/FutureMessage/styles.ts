import styled from "styled-components";
import { vw } from "@/utils";

/** 未来寄语容器 */
export const FutureMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

/** 未来寄语列表滚动区域 */
export const FutureMessageList = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

/** 未来寄语按钮 */
export const BtnWraper = styled.div`
  padding: ${vw(1)} ${vw(8)};
  border-radius: ${vw(12)};
  border: ${vw(1)} solid #f97e93;
  color: #f97e93;
  font-size: ${vw(14)};
  cursor: pointer;

  &:active {
    opacity: 0.85;
  }
`;

/** 页签栏：待开启 / 已解锁 */
export const TabBar = styled.div`
  display: flex;
  gap: ${vw(24)};
  padding: ${vw(8)} ${vw(16)} 0;
`;

/** 页签项 */
export const TabItem = styled.div<{ $active: boolean }>`
  flex: 1;
  text-align: center;
  position: relative;
  padding: ${vw(6)} ${vw(2)};
  font-size: ${vw(15)};
  color: ${({ $active }) => ($active ? "#f97e93" : "#9c9c9c")};
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
    background: #f97e93;
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 0.2s;
  }
`;

/** 加载更多提示 */
export const LoadMoreTip = styled.p`
  text-align: center;
  font-size: ${vw(12)};
  color: #9c9c9c;
  padding: ${vw(12)} 0;
  margin: 0;
`;
