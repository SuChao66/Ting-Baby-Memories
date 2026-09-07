import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 信封容器（含 3D 透视） */
export const EnvelopeContainer = styled.div`
  position: relative;
  margin-top: ${vw(40)};
  margin-bottom: ${vw(12)};
  height: ${vw(150)};
  background: #fff;
  border: ${vw(1)} solid #ffd6df;
  border-radius: ${vw(8)};
  perspective: ${vw(600)};
  cursor: pointer;

  &:active {
    opacity: 0.9;
  }
`;

/** 信封顶部翻盖（拆开时向上翻开） */
export const EnvelopeFlap = styled.div<{ $opened: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${vw(34)};
  background: linear-gradient(180deg, #ffd9e2, #ffcfdb);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform-origin: top center;
  transition: transform 0.35s ease;
  transform: rotateX(${(props) => (props.$opened ? 180 : 0)}deg);
`;

/** 信封封口蜡封（拆开时碎裂消失） */
export const Seal = styled.div<{ $broken: boolean }>`
  position: absolute;
  top: ${vw(19)};
  left: 50%;
  transform: translateX(-50%) scale(${(props) => (props.$broken ? 0.6 : 1)});
  width: ${vw(30)};
  height: ${vw(30)};
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #ff97ad, #ff6b8a);
  box-shadow: 0 ${vw(2)} ${vw(5)} rgba(255, 107, 138, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 3;
  opacity: ${(props) => (props.$broken ? 0 : 1)};
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
`;

/** 信封正面信息区（信纸升起时淡出） */
export const EnvelopeBody = styled.div<{ $hidden?: boolean }>`
  position: absolute;
  top: ${vw(44)};
  left: ${vw(14)};
  right: ${vw(14)};
  bottom: ${vw(14)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${vw(8)};
  opacity: ${(props) => (props.$hidden ? 0 : 1)};
  transition: opacity 0.25s ease;
`;

/** 信封：开启日期 */
export const EnvelopeDate = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${vw(4)};
  font-size: ${vw(12)};
  color: #ff6b8a;
`;

/** 信封：寄件人 */
export const EnvelopeSender = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${vw(6)};
  font-size: ${vw(14)};
  color: #2d2d2d;
`;

/** 信封：寄件人头像 */
export const EnvelopeSenderAvatar = styled.span`
  flex-shrink: 0;
  width: ${vw(24)};
  height: ${vw(24)};
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
  }
`;

/** 信封：拆开提示 */
export const EnvelopeHint = styled.span`
  font-size: ${vw(11)};
  color: #9c9c9c;
`;

/** 从信封中升起的信纸（翻盖打开后弹出；收起时倒放降回信封） */
export const RisingPaper = styled.div<{ $reverse?: boolean }>`
  position: absolute;
  top: ${vw(16)};
  left: ${vw(16)};
  right: ${vw(16)};
  bottom: ${vw(16)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${vw(6)};
  background: #fff;
  font-size: ${vw(12)};
  color: #666;
  z-index: 2;
  animation: ${(props) =>
    props.$reverse
      ? "paperDrop 0.4s ease-in forwards"
      : "paperRise 0.4s ease-out"};

  @keyframes paperRise {
    from {
      opacity: 0;
      transform: translateY(${vw(40)});
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 倒放：信纸降回信封并消失（forwards 保持降下后的状态） */
  @keyframes paperDrop {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(${vw(40)});
    }
  }
`;
