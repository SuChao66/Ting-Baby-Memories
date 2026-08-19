// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 通用卡片 */
export const Card = styled.div`
  background: #fff;
  border-radius: ${vw(20)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
`;

/** 卡片行 */
export const CardRow = styled.div<{ $isLast?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: ${vw(12)};
  min-height: ${vw(52)};
  padding: ${vw(10)} ${vw(20)};
  border-bottom: ${(props) => (props.$isLast ? "none" : "1px solid #f5f5f5")};
  cursor: pointer;
  background: #fff;
  border-radius: ${vw(12)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);

  &:active {
    background: #fafafa;
  }
`;

/** 行图标 */
export const RowIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${vw(32)};
  height: ${vw(32)};
  border-radius: ${vw(8)};
  background: #fff0f3;
  flex-shrink: 0;
`;

/** 行内小头像 */
export const RowAvatar = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${vw(36)};
  height: ${vw(36)};
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd3dd 0%, #ffe3ec 100%);
  overflow: hidden;
`;

/** 行标题 */
export const RowLabel = styled.span`
  font-size: ${vw(15)};
  color: #2d2d2d;
`;

/** 行右侧内容 */
export const RowValue = styled.span`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: ${vw(14)};
  color: #999;
`;

/** 行右箭头 */
export const RowArrow = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ccc;
  margin-left: auto;
  flex-shrink: 0;
`;
