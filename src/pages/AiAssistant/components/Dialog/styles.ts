// 导入 styled-components
import styled, { keyframes } from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 对话滚动区（有会话后替代欢迎区，占据输入条上方全部空间） */
export const DialogScroll = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

/** 消息列表 */
export const DialogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(16)};
`;

/** 一条问答组（一问一答） */
export const SessionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(8)};
`;

/** 消息行：$isUser 时内容靠右 */
export const Row = styled.div<{ $isUser?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: ${vw(8)};
  justify-content: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
`;

/** AI 头像 */
export const AiAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${vw(32)};
  height: ${vw(32)};
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
  flex-shrink: 0;
`;

/** 用户提问气泡（右侧，粉色渐变白字） */
export const BubbleQuestion = styled.div`
  max-width: 76%;
  box-sizing: border-box;
  padding: ${vw(10)} ${vw(14)};
  border-radius: ${vw(14)} ${vw(14)} ${vw(2)} ${vw(14)};
  background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
  color: #fff;
  font-size: ${vw(14)};
  line-height: ${vw(22)};
  word-break: break-word;
  white-space: pre-wrap;
  box-shadow: 0 ${vw(2)} ${vw(8)} rgba(255, 107, 138, 0.2);
`;

/** AI 回答气泡（左侧，白底浅粉描边） */
export const BubbleAnswer = styled.div`
  max-width: 80%;
  box-sizing: border-box;
  padding: ${vw(10)} ${vw(14)};
  border-radius: ${vw(14)} ${vw(14)} ${vw(14)} ${vw(2)};
  background: #fff;
  border: 1px solid #ffd3dd;
  color: #2d2d2d;
  font-size: ${vw(14)};
  line-height: ${vw(22)};
  word-break: break-word;
  /* 内容经 Markdown 渲染，换行由 <p>/<br> 控制，禁用 pre-wrap 防间距翻倍 */
  white-space: normal;
`;

/** 思考中气泡（同回答气泡，内放跳动小圆点） */
export const BubbleThinking = styled(BubbleAnswer)`
  display: flex;
  align-items: center;
  gap: ${vw(5)};
  padding: ${vw(13)} ${vw(16)};
`;

/** 小圆点跳动动画 */
const dotJump = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(${vw(-4)});
    opacity: 1;
  }
`;

/** 思考中跳动小圆点（$delay 控制错峰） */
export const ThinkingDot = styled.span<{ $delay?: number }>`
  width: ${vw(6)};
  height: ${vw(6)};
  border-radius: 50%;
  background: #ff6b8a;
  animation: ${dotJump} 1.2s ease-in-out infinite;
  animation-delay: ${({ $delay = 0 }) => $delay}s;
`;
