// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 全屏遮罩：阻断底层交互 */
export const Mask = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
`;

/** 进度卡片 */
export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(16)};
  min-width: ${vw(240)};
  padding: ${vw(14)} ${vw(28)};
  background: rgba(255, 255, 255, 0.96);
  border-radius: ${vw(18)};
  box-shadow: 0 ${vw(8)} ${vw(32)} rgba(0, 0, 0, 0.2);
`;

/** 圆环容器 */
export const RingWrap = styled.div`
  position: relative;
  width: ${vw(100)};
  height: ${vw(100)};
`;

export const RingSvg = styled.svg`
  width: 100%;
  height: 100%;
  /* 旋转 -90°，让进度从顶部开始 */
  transform: rotate(-90deg);
`;

export const RingBg = styled.circle`
  fill: none;
  stroke: #ffe4ec;
  stroke-width: 10;
`;

export const RingFg = styled.circle`
  fill: none;
  stroke: #ff6b8a;
  stroke-width: 10;
  transition: stroke-dashoffset 0.2s linear;
`;

/** 圆环中心百分比 */
export const PercentText = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${vw(22)};
  font-weight: 600;
  color: #ff6b8a;
`;

/** 提示文案 */
export const TitleText = styled.span`
  font-size: ${vw(14)};
  color: #666;
`;
