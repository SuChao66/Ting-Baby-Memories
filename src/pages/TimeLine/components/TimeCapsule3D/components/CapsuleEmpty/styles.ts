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

/** 空态容器：深空渐变背景 */
export const EmptyState = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${vw(16)};
  background: linear-gradient(180deg, #0a0a1f 0%, #1a1a3e 55%, #2d1b4e 100%);
`;

/** 空态发光星尘胶囊图标 */
export const EmptyIcon = styled.div`
  width: ${vw(72)};
  height: ${vw(72)};
  border-radius: 50%;
  background: radial-gradient(
    circle at 35% 30%,
    rgba(255, 214, 120, 0.9),
    rgba(255, 107, 138, 0.5) 55%,
    rgba(26, 26, 62, 0.2)
  );
  box-shadow: 0 0 ${vw(32)} rgba(255, 107, 138, 0.5);
  animation: ${breathe} 3s ease-in-out infinite;
`;

/** 空态标题 */
export const EmptyTitle = styled.div`
  font-size: ${vw(16)};
  font-weight: 600;
  color: #ffffff;
`;

/** 空态引导文案 */
export const EmptyTip = styled.div`
  font-size: ${vw(12)};
  color: #99a0c0;
  text-align: center;
  line-height: 1.6;
  /* 支持文案中的 \n 换行 */
  white-space: pre-line;
`;

/** 重试按钮 */
export const RetryButton = styled.button`
  margin-top: ${vw(8)};
  padding: ${vw(8)} ${vw(28)};
  border: none;
  border-radius: ${vw(999)};
  font-size: ${vw(13)};
  color: #ffffff;
  cursor: pointer;
  background: linear-gradient(135deg, #ff6b8a 0%, #b388ff 100%);
  box-shadow: 0 ${vw(4)} ${vw(16)} rgba(255, 107, 138, 0.4);
  transition:
    transform 0.15s ease,
    opacity 0.15s ease;
  &:active {
    transform: scale(0.96);
    opacity: 0.9;
  }
`;
