// 导入 AI 助手页面样式组件
import {
  AiContainer,
  AiScroll,
  HeroSection,
  HeroTitle,
  HeroDesc,
  SectionTitle,
  Disclaimer,
  InputBar,
} from "./styles";
// 导入组件
import NavHeader from "@/components/navHeader";
import FeaturesCard from "./components/FeaturesCard";
import QuickPrompts from "./components/QuickPrompts";
import InputPill from "./components/InputPill";
// 导入 context
import { InputValueContext } from "@/context";
// 导入 React Hooks
import { useState } from "react";

export default function AiAssistant() {
  // AI 输入框内容（提升到快捷指令与输入框的共同父级，供两者共享）
  const [question, setQuestion] = useState("");

  // AI 能力尚未上线，入口与指令先统一提示"即将上线"
  const handleComingSoon = () => {
    Toast.show({ title: "即将上线，敬请期待" });
  };

  return (
    <>
      <NavHeader title="AI 助手" />
      <AiContainer>
        {/* 中间滚动内容区 */}
        <AiScroll>
          {/* 顶部问候区 */}
          <HeroSection>
            <HeroTitle>你好呀，我是你的 AI 小助手</HeroTitle>
            <HeroDesc>会陪你一起记录宝宝长大的每一天</HeroDesc>
          </HeroSection>

          {/* AI 功能入口（轮播，每页两个功能，高度固定不随功能数增长） */}
          <SectionTitle>AI 功能</SectionTitle>
          <FeaturesCard handleComingSoon={handleComingSoon} />
        </AiScroll>

        {/* 底部固定对话输入条（Provider 需同时覆盖快捷指令与输入框） */}
        <InputValueContext.Provider value={{ question, setQuestion }}>
          <InputBar>
            {/* 快捷按钮 */}
            <QuickPrompts />

            {/* 输入框 */}
            <InputPill />

            {/* AI 说明与免责 */}
            <Disclaimer>
              内容由 AI 生成，仅供参考；健康相关问题请以医生建议为准
            </Disclaimer>
          </InputBar>
        </InputValueContext.Provider>
      </AiContainer>
    </>
  );
}
