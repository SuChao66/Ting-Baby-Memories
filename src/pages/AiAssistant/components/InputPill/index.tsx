import { useContext } from "react";
// 导入样式
import { InputContainer, InputField, SendButton } from "./styles";
// 导入工具函数
import { vw } from "@/utils";
// 导入 React Icons 图标
import { TbSparkles, TbSend } from "react-icons/tb";
// 导入context
import { InputValueContext } from "@/context";

interface IProps {
  send: () => void;
}

export default function InputPill(props: IProps) {
  const { send } = props;
  // 输入框内容由父级 Provider 提供，与快捷指令共享同一份状态
  const { question, setQuestion } = useContext(InputValueContext)!;

  // 发送消息（AI 对话能力 v2 接入，当前提示即将上线）
  const handleSend = async () => {
    if (!question.trim()) return;
    // 设置输入框内容
    setQuestion(question.trim());
    // 发送请求
    send();
    // 清空输入框
    setQuestion("");
  };

  return (
    <InputContainer>
      <TbSparkles color="#ff6b8a" size={vw(16)} />
      <InputField
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="想问什么都可以，问问 AI 小助手…"
      />
      <SendButton onClick={handleSend}>
        <TbSend color="#fff" size={vw(18)} />
      </SendButton>
    </InputContainer>
  );
}
