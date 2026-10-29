import { useContext } from "react";
// 导入样式
import { ChipsBar, Chip } from "./styles";
// 导入context
import { InputValueContext } from "@/context";

/** 预设快捷指令 chips（引导用户把问题聚焦到预设任务） */
const quickPrompts = [
  "本周小结",
  "生长曲线怎么样",
  "下次疫苗是什么时候",
  "孩子发烧了怎么办",
];

export default function QuickPrompts() {
  // 使用context
  const { setQuestion } = useContext(InputValueContext)!;

  // 点击快捷指令，填充到输入框
  const handleChipClick = (prompt: string) => {
    setQuestion(prompt);
  };

  return (
    <>
      {/* 快捷指令横向滚动条 */}
      <ChipsBar>
        {quickPrompts.map((prompt) => (
          <Chip key={prompt} onClick={() => handleChipClick(prompt)}>
            {prompt}
          </Chip>
        ))}
      </ChipsBar>
    </>
  );
}
