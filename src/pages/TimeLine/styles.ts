import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 记录容器 */
export const TimeLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  gap: ${vw(12)};

  &::-webkit-scrollbar {
    display: none;
  }

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/** 悬浮按钮 */
export const FloatButton = styled.div`
  position: fixed;
  right: ${vw(20)};
  bottom: ${vw(80)};
  width: ${vw(48)};
  height: ${vw(48)};
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
  box-shadow: 0 ${vw(4)} ${vw(16)} rgba(255, 107, 138, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  cursor: pointer;

  &:active {
    opacity: 0.85;
  }
`;
