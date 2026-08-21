import styled from "styled-components";
import { vw } from "@/utils";

/* ========== 功能菜单网格 ========== */
export const MenuGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${vw(16)};
  background: #fff;
  border-radius: ${vw(20)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
  padding: ${vw(20)} ${vw(12)};
`;

export const MenuGridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(8)};
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
`;

export const MenuIconWrap = styled.div<{ $bg: string }>`
  width: ${vw(44)};
  height: ${vw(44)};
  border-radius: ${vw(12)};
  background: ${(props) => props.$bg};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MenuLabel = styled.span`
  font-size: ${vw(12)};
  color: #2d2d2d;
`;
