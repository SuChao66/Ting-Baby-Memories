import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 3D 胶囊内容容器 */
export const CapsuleContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

/** Canvas 渲染容器 */
export const CanvasWrap = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
  /* 深空渐变背景：顶部银河微光 + 深蓝紫到暗紫过渡 */
  background:
    radial-gradient(
      ellipse at 50% 0%,
      rgba(100, 181, 246, 0.14) 0%,
      transparent 55%
    ),
    linear-gradient(180deg, #0a0a1f 0%, #1a1a3e 55%, #2d1b4e 100%);
`;

/** 返回全景按钮：左上角毛玻璃 */
export const BackButton = styled.button`
  position: absolute;
  top: ${vw(16)};
  left: ${vw(16)};
  z-index: 12;
  display: flex;
  align-items: center;
  gap: ${vw(6)};
  padding: ${vw(8)} ${vw(18)};
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: ${vw(999)};
  font-size: ${vw(13)};
  color: #ffffff;
  cursor: pointer;
  background: rgba(26, 26, 62, 0.5);
  backdrop-filter: blur(12px);
  transition:
    transform 0.15s ease,
    background 0.15s ease;
  &:active {
    transform: scale(0.95);
    background: rgba(255, 107, 138, 0.35);
  }
`;

/** 返回按钮箭头 */
export const BackArrow = styled.span`
  font-size: ${vw(14)};
  line-height: 1;
`;
