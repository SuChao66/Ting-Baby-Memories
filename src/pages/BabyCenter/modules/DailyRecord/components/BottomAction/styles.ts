import styled from "styled-components";
import { vw } from "@/utils";

/** 底部操作栏容器（fixed 定位于页面底部） */
export const BottomActionBar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-radius: ${vw(20)} ${vw(20)} 0 0;
  box-shadow: 0 -${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
  padding: ${vw(20)} ${vw(20)} ${vw(24)};
  z-index: 10;
`;

/** 操作按钮网格 */
export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${vw(16)} ${vw(8)};
  margin-bottom: ${vw(16)};
`;

/** 单个操作按钮 */
export const ActionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(8)};
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
`;

/** 操作按钮图标 */
export const ActionIconWrap = styled.div<{ $gradient: string }>`
  width: ${vw(56)};
  height: ${vw(56)};
  border-radius: 50%;
  background: ${(props) => props.$gradient};
  display: flex;
  justify-content: center;
  align-items: center;
`;

/** 操作按钮文案 */
export const ActionLabel = styled.span`
  font-size: ${vw(13)};
  color: #555;
`;

/** 展开/收起按钮 */
export const CollapseBtn = styled.div<{ $collapsed: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${vw(120)};
  height: ${vw(32)};
  margin: 0 auto;
  background: #f5f5f5;
  border-radius: ${vw(16)};
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }

  .triggle {
    transform: ${(props) => (props.$collapsed ? "rotate(180deg)" : "rotate(0)")};
    transition: "transform 0.5s";
  }
`;
