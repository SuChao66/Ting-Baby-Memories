// 导入 AI 助手页面样式组件
import {
  AiContainer,
  AiScroll,
  HeroSection,
  HeroGif,
  HeroDesc,
  QuickBar,
  AiFeatureBtn,
  FeaturePopup,
  FeaturePopupTitle,
  Disclaimer,
  InputBar,
} from "./styles";
import { AiOutlineClear } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { FaAirbnb } from "react-icons/fa";
// 导入组件
import NavHeader from "@/components/navHeader";
import FeaturesCard from "./components/FeaturesCard";
import QuickPrompts from "./components/QuickPrompts";
import InputPill from "./components/InputPill";
import Dialog from "./components/Dialog";
// 导入 context
import { InputValueContext } from "@/context";
// 导入 React Hooks
import { useRef, useState } from "react";
// 导入store
import { useAiStore } from "@/store";
// 导入类型
import type { sessionItem } from "@/types";
import type { IAiChatMessage, AiScene } from "@/interface/ai";
// 导入接口
import { chatApi } from "@/api";
// 导入工具函数
import { SessionManager, uuid, vw } from "@/utils";
// 导入常量
import { MAX_HISTORY } from "@/enums";

export default function AiAssistant() {
  // AI 输入框内容（提升到快捷指令与输入框的共同父级，供两者共享）
  const [question, setQuestion] = useState("");
  // Ai store
  const { sessionCode, setSessionCode } = useAiStore((state) => state);
  // 用户会话session
  const [sessions, setSessions] = useState<sessionItem[]>([]);
  // AI 功能弹框
  const [featureVisible, setFeatureVisible] = useState(false);
  // 当前选中的 AI 场景（从 AI 功能入口进入时记录，随下次发送消费后重置）
  const [scene, setScene] = useState<AiScene | "">("");

  // 发送中标记（ref 拦截重复点击，state 受闭包旧值影响拦不住连点）
  const sendingRef = useRef(false);

  // 选择 AI 功能：填充引导语到输入框并记录场景，弹框关闭后用户直接发送
  const handleSelectFeature = (feature: { key: AiScene; prompt: string }) => {
    setScene(feature.key);
    setQuestion(feature.prompt);
    setFeatureVisible(false);
  };

  // 创建新会话
  const createNewDialog = () => {
    // 创建新的会话码
    setSessionCode(uuid());
    // 清空会话
    setSessions([]);
  };

  // 发送问句
  const send = async () => {
    const text = question.trim();
    if (!text || sendingRef.current) return;
    sendingRef.current = true;
    // 会话码：首次发送时生成并写入 store
    let code = sessionCode;
    if (!code) {
      code = uuid();
      setSessionCode(code);
    }
    // 先渲染用户气泡，AI 气泡进入"思考中"占位
    const session = SessionManager.createSession(code);
    session.question = text;
    setSessions((prev) => [...prev, session]);
    try {
      // 携带最近 10 轮问答作为多轮上下文（回答未返回的占位不参与）
      const history = sessions.slice(-MAX_HISTORY).flatMap((item) => {
        const msgs: IAiChatMessage[] = [
          { role: "user", content: item.question },
        ];
        if (item.answer) {
          msgs.push({ role: "assistant", content: item.answer });
        }
        return msgs;
      });
      const { data } = await chatApi({
        question: text,
        reqId: session.reqId,
        sessionCode: code,
        scene: scene || undefined,
        history,
      });
      // 不可变更新对应会话的回答，触发气泡渲染
      setSessions((prev) =>
        prev.map((item) =>
          item.reqId === session.reqId
            ? { ...item, answer: data.answer }
            : item,
        ),
      );
    } catch {
      // 拦截器已统一 Toast 错误；这里把占位改为失败提示，避免一直停在"思考中"
      setSessions((prev) =>
        prev.map((item) =>
          item.reqId === session.reqId
            ? { ...item, answer: "抱歉，回答生成失败了，请重新问一次试试～" }
            : item,
        ),
      );
    } finally {
      // 场景为一次性标记，本次发送后重置，避免影响后续普通问答
      setScene("");
      sendingRef.current = false;
    }
  };

  return (
    <>
      <NavHeader
        title="AI 助手"
        right={<AiOutlineClear onClick={createNewDialog} size={vw(22)} />}
      />
      <AiContainer>
        {sessions.length ? (
          <Dialog sessions={sessions} />
        ) : (
          <AiScroll>
            {/* 顶部问候区：动图 + 一行描述 */}
            <HeroSection>
              <HeroGif>
                <FaAirbnb color="#fff" size={vw(34)} />
              </HeroGif>
              <HeroDesc>你好呀，我是你的 AI 小助手</HeroDesc>
            </HeroSection>
          </AiScroll>
        )}

        {/* 底部固定对话输入条（Provider 需同时覆盖快捷指令与输入框） */}
        <InputValueContext.Provider value={{ question, setQuestion }}>
          <InputBar>
            {/* 快捷指令行：chips 滚动区 + 右侧固定 AI 功能入口 */}
            <QuickBar>
              <QuickPrompts />
              {/* AI 功能入口 */}
              <AiFeatureBtn onClick={() => setFeatureVisible(true)}>
                <IoIosAddCircle size={vw(20)} />
              </AiFeatureBtn>
            </QuickBar>

            {/* 输入框 */}
            <InputPill send={send} />

            {/* AI 说明与免责 */}
            <Disclaimer>
              内容由 AI 生成，仅供参考；健康相关问题请以医生建议为准
            </Disclaimer>
          </InputBar>
        </InputValueContext.Provider>
      </AiContainer>

      {/* AI 功能弹框（底部弹出，列表展示） */}
      <Popup
        visible={featureVisible}
        position="bottom"
        round
        closeable
        onClose={() => setFeatureVisible(false)}
      >
        <FeaturePopup>
          <FeaturePopupTitle>AI 功能</FeaturePopupTitle>
          <FeaturesCard onSelect={handleSelectFeature} />
        </FeaturePopup>
      </Popup>
    </>
  );
}
