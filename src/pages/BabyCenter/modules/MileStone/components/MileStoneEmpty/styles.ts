import styled from "styled-components";
import { vw } from "@/utils";

/* ========== 空状态引导插画 ========== */
export const MileStoneEmpty = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    object-fit: cover;
  }
`;

/* ========== 底部引导提示 ========== */
export const TipText = styled.p`
  display: flex;
  align-items: center;
  gap: ${vw(2)};
  font-size: ${vw(14)};
  color: #9c9c9c;
`;

/** 提示中的“添加”胶囊 */
export const TipTag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 ${vw(4)};
  padding: ${vw(2)} ${vw(12)};
  border-radius: ${vw(12)};
  background: #fb7e93;
  box-shadow: 0 0 0 ${vw(3)} #fbd3da;
  color: #fff;
  font-size: ${vw(13)};
`;
