// 导入 styled-components
import styled, { keyframes } from "styled-components";
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
  justify-content: center;
  gap: ${vw(16)};
  box-sizing: border-box;
  padding: ${vw(8)} 0;
  box-sizing: border-box;
`;

/** 顶部问候区（动图 + 一行描述，无卡片背景） */
export const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(14)};
  padding: ${vw(16)} ${vw(12)} ${vw(4)};
  text-align: center;
`;

/** 星光浮动动画 */
const heroFloat = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(${vw(-6)}) rotate(4deg);
  }
`;

/** 光晕呼吸动画 */
const heroGlow = keyframes`
  0%, 100% {
    box-shadow: 0 ${vw(6)} ${vw(20)} rgba(255, 107, 138, 0.22);
  }
  50% {
    box-shadow: 0 ${vw(6)} ${vw(28)} rgba(255, 107, 138, 0.4);
  }
`;

/** 问候动图：粉色渐变星光图标（浮动 + 光晕呼吸） */
export const HeroGif = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${vw(72)};
  height: ${vw(72)};
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
  animation:
    ${heroFloat} 2.4s ease-in-out infinite,
    ${heroGlow} 2.4s ease-in-out infinite;
`;

/** 问候描述（一行） */
export const HeroDesc = styled.div`
  font-size: ${vw(14)};
  color: #808080;
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
  font-size: ${vw(12)};
  color: #b0b0b0;
`;

/** 底部固定对话输入条（不随内容滚动） */
export const InputBar = styled.div`
  flex-shrink: 0;
  background: #fff0f3;
`;

/** 快捷指令行（chips 滚动区 + 右侧固定 AI 功能入口） */
export const QuickBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(8)};
  padding: ${vw(3)} ${vw(6)};
`;

/** AI 功能固定入口按钮（仅图标，不随 chips 滚动） */
export const AiFeatureBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: ${vw(4)};
  color: #ff6b8a;
  cursor: pointer;

  &:active {
    transform: scale(0.94);
  }
`;

/** AI 功能弹框内容容器 */
export const FeaturePopup = styled.div`
  padding: ${vw(20)} ${vw(16)} ${vw(28)};
`;

/** AI 功能弹框标题 */
export const FeaturePopupTitle = styled.div`
  font-size: ${vw(16)};
  font-weight: 600;
  color: #2d2d2d;
  text-align: center;
  margin-bottom: ${vw(12)};
`;

/** 历史记录弹框容器（左侧弹出，固定宽度满高） */
export const HistoryPopup = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: ${vw(20)} ${vw(12)} ${vw(12)};
  background: #fff;
  border-radius: 0 ${vw(12)} ${vw(12)} 0;
`;

/** 历史记录弹框标题 */
export const HistoryPopupTitle = styled.div`
  flex-shrink: 0;
  font-size: ${vw(16)};
  font-weight: 600;
  color: #2d2d2d;
  text-align: center;
  margin-bottom: ${vw(8)};
`;

/** 历史记录滚动列表 */
export const HistoryList = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

/** 日期分组标题 */
export const DateGroupTitle = styled.div`
  font-size: ${vw(13)};
  color: #b0b0b0;
  padding: ${vw(10)} ${vw(4)} ${vw(6)};
`;

/** 会话卡片（展示会话首句 + 元信息） */
export const SessionCard = styled.div`
  padding: ${vw(10)} ${vw(12)};
  margin-bottom: ${vw(8)};
  border-radius: ${vw(12)};
  background: #fff5f7;
  cursor: pointer;

  &:active {
    transform: scale(0.98);
  }
`;

/** 会话首句（单行截断） */
export const SessionQuestion = styled.div`
  font-size: ${vw(14)};
  color: #2d2d2d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/** 历史记录空态 / 加载提示 */
export const HistoryEmpty = styled.div`
  padding: ${vw(40)} 0;
  text-align: center;
  font-size: ${vw(13)};
  color: #b0b0b0;
`;

/** 历史记录底部加载提示（触底加载下一页） */
export const HistoryLoadMore = styled.div`
  padding: ${vw(12)} 0 ${vw(4)};
  text-align: center;
  font-size: ${vw(12)};
  color: #b0b0b0;
`;
