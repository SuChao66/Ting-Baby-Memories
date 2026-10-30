import styled from "styled-components";
import { vw } from "@/utils";

/** 快捷指令横向滚动条（固定在输入框上方，隐藏滚动条；在 QuickBar 中占剩余宽度可滚动） */
export const ChipsBar = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  gap: ${vw(8)};
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/** 快捷指令 chip */
export const Chip = styled.div`
  flex-shrink: 0;
  white-space: nowrap;
  padding: ${vw(6)} ${vw(12)};
  border-radius: ${vw(32)};
  background: #fff;
  border: 1px solid #ffd3dd;
  font-size: ${vw(12)};
  color: #2d2d2d;
  cursor: pointer;

  &:active {
    background: #fff0f3;
  }
`;
