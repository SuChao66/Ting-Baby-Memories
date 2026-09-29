import styled from "styled-components";
import { vw } from "@/utils";

/** 进度概览卡片：粉色渐变 + 柔和投影 */
export const ProgressHeaderWrap = styled.div`
  padding: ${vw(16)};
  border-radius: ${vw(16)};
  background: linear-gradient(135deg, #ff8fa8 0%, #ff6b8a 100%);
  box-shadow: 0 ${vw(6)} ${vw(16)} rgba(255, 107, 138, 0.25);
`;

/** 月龄徽章 + 统计行 */
export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(10)};
`;

/** 月龄徽章 */
export const AgeBadge = styled.div`
  padding: ${vw(4)} ${vw(12)};
  border-radius: ${vw(20)};
  background: rgba(255, 255, 255, 0.25);
  border: ${vw(1)} solid rgba(255, 255, 255, 0.5);
  color: #fff;
  font-size: ${vw(14)};
  font-weight: 600;
`;

/** 统计文案 */
export const StatsText = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: ${vw(13)};
`;

/** 统计数字强调 */
export const StatNum = styled.span`
  color: #fff;
  font-size: ${vw(18)};
  font-weight: 700;
  margin: 0 ${vw(2)};
`;

/** 进度条轨道 */
export const ProgressTrack = styled.div`
  margin-top: ${vw(14)};
  height: ${vw(10)};
  border-radius: ${vw(5)};
  background: rgba(255, 255, 255, 0.35);
  overflow: hidden;
`;

/** 进度条填充 */
export const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  border-radius: ${vw(5)};
  background: #fff;
  transition: width 0.4s ease;
`;

/** 底部引导文案 */
export const ProgressDesc = styled.div`
  margin-top: ${vw(10)};
  color: rgba(255, 255, 255, 0.85);
  font-size: ${vw(11)};
`;
