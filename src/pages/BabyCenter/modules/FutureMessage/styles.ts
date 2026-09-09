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

/** 加载更多提示 */
export const LoadMoreTip = styled.p`
  text-align: center;
  font-size: ${vw(12)};
  color: #9c9c9c;
  padding: ${vw(12)} 0;
  margin: 0;
`;
