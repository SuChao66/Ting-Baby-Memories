// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** AI 助手页面容器（不滚动，上滚动区 + 下固定输入条） */
export const AiContainer = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

/** 中间滚动内容区 */
export const AiScroll = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${vw(16)};
  box-sizing: border-box;
  padding: ${vw(8)} 0;
  box-sizing: border-box;
`;

/** 顶部问候区 */
export const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(10)};
  padding: ${vw(16)} ${vw(12)};
  border-radius: ${vw(12)};
  background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.3);
  text-align: center;
`;

/** 问候标题 */
export const HeroTitle = styled.div`
  font-size: ${vw(18)};
  font-weight: 600;
  color: #fff;
`;

/** 问候副文案 */
export const HeroDesc = styled.div`
  font-size: ${vw(14)};
  color: rgba(255, 255, 255, 0.85);
`;

/** 分区标题 */
export const SectionTitle = styled.div`
  font-size: ${vw(16)};
  font-weight: 600;
  color: #2d2d2d;
  padding-left: ${vw(4)};
`;

/** AI 说明与免责文案 */
export const Disclaimer = styled.div`
  padding: ${vw(8)} 0 ${vw(4)};
  text-align: center;
  font-size: ${vw(11)};
  color: #b0b0b0;
`;

/** 底部固定对话输入条（不随内容滚动） */
export const InputBar = styled.div`
  flex-shrink: 0;
  background: #fff0f3;
`;
