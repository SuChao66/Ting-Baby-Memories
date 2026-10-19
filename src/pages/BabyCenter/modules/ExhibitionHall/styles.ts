import styled from "styled-components";
// import { vw } from "@/utils";

/** 展厅 */
export const ExhibitionHallContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
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
