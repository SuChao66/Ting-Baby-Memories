import styled, { keyframes } from "styled-components";
import { vw } from "@/utils";

// 呼吸动画
const breathe = keyframes`
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.15);
  }
`;

// 环旋转动画
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

/** 加载遮罩：深空毛玻璃风格 */
export const LoadingMask = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${vw(24)};
  background: rgba(0, 0, 0, 1);
  backdrop-filter: blur(8px);
`;

/** 双色旋转环（粉 = 出生端 / 蓝 = 时光端） */
export const LoadingRing = styled.div`
  position: relative;
  width: ${vw(64)};
  height: ${vw(64)};
  border-radius: 50%;
  border: ${vw(3)} solid transparent;
  border-top-color: #ff6b8a;
  border-right-color: #64b5f6;
  filter: drop-shadow(0 0 ${vw(8)} rgba(255, 107, 138, 0.6));
  animation: ${spin} 1.2s linear infinite;
`;

/** 环心金色脉冲光点 */
export const LoadingCore = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${vw(12)};
  height: ${vw(12)};
  margin: -${vw(6)} 0 0 -${vw(6)};
  border-radius: 50%;
  background: #ffd700;
  box-shadow: 0 0 ${vw(10)} #ffd700;
  animation: ${breathe} 1.6s ease-in-out infinite;
`;

/** 加载文案 */
export const LoadingText = styled.div`
  font-size: ${vw(14)};
  color: #ffffff;
  letter-spacing: ${vw(2)};
  animation: ${breathe} 2.4s ease-in-out infinite;
`;

/** 进度百分比高亮 */
export const LoadingPercent = styled.span`
  margin-left: ${vw(4)};
  font-weight: 600;
  color: #ff6b8a;
`;
