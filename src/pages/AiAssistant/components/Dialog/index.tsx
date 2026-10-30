// 导入 React Hooks
import { useEffect, useRef } from "react";
// 导入样式
import {
  DialogScroll,
  DialogList,
  SessionGroup,
  Row,
  AiAvatar,
  BubbleQuestion,
  BubbleAnswer,
  BubbleThinking,
  ThinkingDot,
} from "./styles";
// 导入图标
import { TbSparkles } from "react-icons/tb";
// 导入工具函数
import { vw } from "@/utils";
// 导入 Markdown 渲染组件
import MarkdownContent from "@/components/MarkdownContent";
// 导入类型
import type { sessionItem } from "@/types";

interface IProps {
  sessions: sessionItem[];
}

export default function Dialog(props: IProps) {
  const { sessions } = props;
  // 列表底部锚点：新消息 / 回答更新后自动滚动到底
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [sessions]);

  return (
    <DialogScroll>
      <DialogList>
        {sessions.map((item) => (
          <SessionGroup key={item.reqId}>
            {/* 用户提问：靠右 */}
            <Row $isUser>
              <BubbleQuestion>{item.question}</BubbleQuestion>
            </Row>
            {/* AI 回答：靠左；回答未返回时展示"思考中"占位 */}
            <Row>
              <AiAvatar>
                <TbSparkles color="#fff" size={vw(16)} />
              </AiAvatar>
              {item.answer ? (
                <BubbleAnswer>
                  {/* LLM 回答为 Markdown，经渲染组件输出（内部已做 XSS 结构性防护） */}
                  <MarkdownContent content={item.answer} />
                </BubbleAnswer>
              ) : (
                <BubbleThinking>
                  <ThinkingDot />
                  <ThinkingDot $delay={0.15} />
                  <ThinkingDot $delay={0.3} />
                </BubbleThinking>
              )}
            </Row>
          </SessionGroup>
        ))}
        {/* 滚动锚点 */}
        <div ref={bottomRef} />
      </DialogList>
    </DialogScroll>
  );
}
