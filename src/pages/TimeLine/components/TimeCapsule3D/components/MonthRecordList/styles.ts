import styled, { keyframes } from "styled-components";
import { vw } from "@/utils";

/** 列表滑入动画：与摘要卡片同款曲线 */
const slideUp = keyframes`
  from {
    transform: translateY(110%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

/** 月内列表卡片外壳：定位并静态承载毛玻璃模糊与阴影，顶部避开返回全景按钮 */
/* 模糊层不参与滑动动画：backdrop-filter 一旦随 transform 动画结束释放合成层，
   会触发全精度重绘导致卡片到位瞬间视觉跳变 */
export const ListCard = styled.div`
  position: absolute;
  left: 20%;
  right: ${vw(12)};
  top: 50%;
  transform: translateY(-50%);
  max-height: 70%;
  overflow: hidden;
  z-index: 12;
  border-radius: ${vw(12)};
  backdrop-filter: blur(16px);
  box-shadow: 0 ${vw(-8)} ${vw(32)} rgba(10, 10, 31, 0.6);
  display: flex;
  flex-direction: column;
`;

/** 列表内层：承载底色边框与滑入动画 */
/* flex auto + min-height 0：外壳 max-height 收紧时随之收缩，高度链闭合
   fill-mode both + 常驻 translateY(0)：动画结束态与自然状态完全一致，杜绝层切换差异 */
export const ListInner = styled.div`
  flex: auto;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: ${vw(14)} ${vw(16)};
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: ${vw(20)};
  background: rgba(26, 26, 62, 0.62);
  transform: translateY(0);
  animation: ${slideUp} 0.32s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

/** 列表头：月份标题 + 记录数 */
export const ListHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${vw(8)};
  padding-bottom: ${vw(10)};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
`;

/** 月份标题 */
export const ListTitle = styled.div`
  font-size: ${vw(16)};
  font-weight: 600;
  color: #ffffff;
  letter-spacing: ${vw(1)};
`;

/** 记录数 */
export const ListCount = styled.div`
  font-size: ${vw(11)};
  color: #99a0c0;
`;

/** 列表体：唯一滚动区域 */
/* flex auto（basis auto）+ min-height 0：内容少时卡片自然收矮，
   内容多时被外壳 max-height 压缩，超出部分仅在此区域滚动 */
export const ListBody = styled.div`
  flex: auto;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  gap: ${vw(8)};
  padding-top: ${vw(10)};
`;

/** 单条记录：左侧标签色条 + 信息列 */
export const RecordItem = styled.div`
  display: flex;
  gap: ${vw(10)};
  padding: ${vw(10)};
  border-radius: ${vw(14)};
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  flex-shrink: 0;
  transition:
    transform 0.15s ease,
    background 0.15s ease;
  &:active {
    transform: scale(0.98);
    background: rgba(255, 107, 138, 0.16);
  }
`;

/** 标签色条 */
export const RecordBar = styled.div<{ $color: string }>`
  flex-shrink: 0;
  width: ${vw(4)};
  border-radius: ${vw(999)};
  background: ${(props) => props.$color};
`;

/** 记录信息列 */
export const RecordInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(4)};
  min-width: 0;
`;

/** 时间行：金色小字 + 可选里程碑徽标 */
export const RecordTime = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(8)};
  font-size: ${vw(11)};
  font-weight: 600;
  color: #ffd700;
  letter-spacing: ${vw(0.5)};
`;

/** 里程碑小徽标 */
export const RecordMilestone = styled.span`
  display: flex;
  align-items: center;
  gap: ${vw(3)};
  padding: ${vw(1)} ${vw(8)};
  border-radius: ${vw(999)};
  font-size: ${vw(9)};
  font-weight: 600;
  color: #0a0a1f;
  background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);

  svg {
    font-size: ${vw(10)};
  }
`;

/** 内容摘要：最多两行省略 */
export const RecordContent = styled.div`
  font-size: ${vw(13)};
  line-height: ${vw(19)};
  color: #e6e9f8;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;
