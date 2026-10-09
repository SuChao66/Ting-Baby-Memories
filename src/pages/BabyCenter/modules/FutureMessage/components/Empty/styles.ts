import styled from "styled-components";
import { vw } from "@/utils";

/** 空状态容器 */
export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: ${vw(14)};
  color: #000000e0;
  img {
    width: ${vw(180)};
  }
`;

/** 空状态提示 */
export const FutureMessageTip = styled.div`
  margin-top: ${vw(12)};
  color: #00000073;
  font-size: ${vw(14)};
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: ${vw(8)};
`;

/** 空状态引导插画区 */
export const BtnWraper = styled.div`
  margin-top: ${vw(12)};
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
