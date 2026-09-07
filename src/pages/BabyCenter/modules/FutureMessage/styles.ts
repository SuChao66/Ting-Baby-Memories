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
