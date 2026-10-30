import styled from "styled-components";
import { vw } from "@/utils";

/** 功能列表容器（弹框内展示，白底由弹框提供） */
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${vw(6)};
  box-sizing: border-box;
`;

/** 功能入口行 */
export const FeatureRow = styled.div<{ $isLast?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${vw(12)};
  padding: ${vw(14)} ${vw(20)};
  border-bottom: ${(props) => (props.$isLast ? "none" : "1px solid #f5f5f5")};
  cursor: pointer;

  &:active {
    background: #fafafa;
  }
`;

/** 功能入口图标容器 */
export const FeatureIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${vw(40)};
  height: ${vw(40)};
  border-radius: ${vw(12)};
  background: #fff0f3;
  flex-shrink: 0;
`;

/** 功能入口文案区 */
export const FeatureTexts = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${vw(4)};
`;

/** 功能入口标题 */
export const FeatureLabel = styled.span`
  font-size: ${vw(14)};
  color: #2d2d2d;
`;

/** 功能入口描述（最多两行，超出省略） */
export const FeatureDesc = styled.span`
  font-size: ${vw(12)};
  color: #999;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

/** 功能入口右箭头 */
export const FeatureArrow = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ccc;
  flex-shrink: 0;
`;
