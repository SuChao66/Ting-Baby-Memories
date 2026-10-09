import styled from "styled-components";
import { vw } from "@/utils";

/** 空状态容器 */
export const EmptyContainer = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${vw(14)};
  color: #000000e0;
`;

/** 空状态提示 */
export const Tip = styled.div`
  margin-top: ${vw(12)};
  color: #00000073;
  font-size: ${vw(14)};
`;

/** 空状态引导文案 */
export const GuideTip = styled.div`
  margin-top: ${vw(12)};
  color: #00000073;
  font-size: ${vw(14)};
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: ${vw(8)};
`;

/** 引导"添加"按钮样式 */
export const BtnWraper = styled.div`
  padding: ${vw(1)} ${vw(8)};
  border-radius: ${vw(12)};
  border: ${vw(1)} solid #f97e93;
  color: #f97e93;
  font-size: ${vw(14)};
`;
