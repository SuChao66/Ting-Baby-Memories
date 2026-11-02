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
  HistoryPopup,
  HistoryPopupTitle,
  HistoryList,
  DateGroupTitle,
  SessionCard,
  SessionQuestion,
  HistoryEmpty,
  HistoryLoadMore,
} from "./styles";
import { AiOutlineClear, AiOutlineHistory } from "react-icons/ai";
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
import type {
  IAiChatMessage,
  AiScene,
  IsessionItem,
  List,
  ISessionRecordItem,
} from "@/interface/ai";
// 导入接口
import { chatApi, chatStreamApi } from "@/api";
// 导入工具函数
import { SessionManager, uuid, vw } from "@/utils";
// 导入常量
import { MAX_HISTORY } from "@/enums";

export default function AiAssistant() {
  // AI 输入框内容（提升到快捷指令与输入框的共同父级，供两者共享）
  const [question, setQuestion] = useState("");
  // Ai store
  const {
    sessionCode,
    setSessionCode,
    getAiChatRecord,
    getAiChatRecordDetail,
  } = useAiStore((state) => state);
  // 用户会话session
  const [sessions, setSessions] = useState<sessionItem[]>([]);
  // AI 功能弹框
  const [featureVisible, setFeatureVisible] = useState(false);
  // 当前选中的 AI 场景（从 AI 功能入口进入时记录，随下次发送消费后重置）
  const [scene, setScene] = useState<AiScene | "">("");
  // 历史会话列表（按日期分组：{ 日期: 会话项[] }）
  const [sessionList, setSessionList] = useState<List>({});
  // 历史记录弹框可见性
  const [historyVisible, setHistoryVisible] = useState(false);
  // 历史记录加载中
  const [historyLoading, setHistoryLoading] = useState(false);
  // 历史会话总数（用于判断是否还有更多）
  const [historyTotal, setHistoryTotal] = useState(0);
  // 历史记录下一页页码与加载锁（ref 保证触底加载不重复请求）
  const historyPageRef = useRef(1);
  const historyLoadingRef = useRef(false);

  // 发送中标记（ref 拦截重复点击，state 受闭包旧值影响拦不住连点）
  const sendingRef = useRef(false);
  // 进行中流式请求的 abort 引用：切新会话时中止回答
  const abortRef = useRef<(() => void) | null>(null);

  // 选择 AI 功能：填充引导语到输入框并记录场景，弹框关闭后用户直接发送
  const handleSelectFeature = (feature: { key: AiScene; prompt: string }) => {
    setScene(feature.key);
    setQuestion(feature.prompt);
    setFeatureVisible(false);
  };

  // 创建新会话
  const createNewDialog = () => {
    // 中止进行中的流式回答
    abortRef.current?.();
    abortRef.current = null;
    // 创建新的会话码
    setSessionCode(uuid());
    // 清空会话
    setSessions([]);
  };

  // 拉取历史会话列表：第一页覆盖，其余页按日期合并追加
  const loadHistory = async () => {
    if (historyLoadingRef.current) return;
    historyLoadingRef.current = true;
    setHistoryLoading(true);
    try {
      const res = await getAiChatRecord({
        page: historyPageRef.current,
        pageSize: 20,
      });
      const total = res?.total ?? 0;
      const list: List = res?.list ?? {};
      setHistoryTotal(total);
      setSessionList((prev) => {
        // 第一页直接覆盖
        if (historyPageRef.current === 1) return list;
        // 其余页合并：同一日期的会话可能跨页返回，按 sessionCode 去重后追加
        // 后端每页内按会话时间倒序，追加到同日期末尾即可保持顺序
        const merged: List = { ...prev };
        for (const [date, items] of Object.entries(list)) {
          const existed = new Set(
            (merged[date] ?? []).map((s) => s.sessionCode),
          );
          merged[date] = [
            ...(merged[date] ?? []),
            ...items.filter((item) => !existed.has(item.sessionCode)),
          ];
        }
        return merged;
      });
      historyPageRef.current += 1;
    } finally {
      historyLoadingRef.current = false;
      setHistoryLoading(false);
    }
  };

  // 点击历史记录按钮：打开左侧弹框并从第一页加载
  const getHistoryRecord = () => {
    setHistoryVisible(true);
    // 每次打开都重置到第一页，保证看到最新会话
    historyPageRef.current = 1;
    loadHistory();
  };

  // 已加载的会话总数（各日期分组累加，用于判断是否还有更多）
  const loadedCount = Object.values(sessionList).reduce(
    (sum, items) => sum + items.length,
    0,
  );

  // 历史列表滚动到底部附近时加载下一页
  const handleHistoryScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (historyLoading || loadedCount >= historyTotal) return;
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    // 距底部不足 60px 时触发加载下一页
    if (scrollTop + clientHeight >= scrollHeight - 60) {
      loadHistory();
    }
  };

  // 点击某个历史会话：拉取问答明细并回填到对话区
  const handleSelectSession = async (item: IsessionItem) => {
    // 中止进行中的流式回答，避免旧会话回答串入新会话
    abortRef.current?.();
    abortRef.current = null;
    // 关闭弹框
    setHistoryVisible(false);
    const data = await getAiChatRecordDetail({
      sessionCode: item.sessionCode,
    });
    // 回填会话码与消息列表（reqId 复用记录 id，仅作渲染 key）
    setSessionCode(item.sessionCode);
    setSessions(
      data.list.map((record: ISessionRecordItem) => ({
        reqId: record._id,
        sessionCode: item.sessionCode,
        question: record.question,
        answer: record.answer,
      })),
    );
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
  // send 暂不接入 UI：显式引用以满足 noUnusedLocals，回退时把下方 InputPill 的 send 改回 send 即可
  void send;

  // 流式发送：回答以增量文本逐段渲染（保留 send 非流式方法备回退）
  const sendStream = async () => {
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
    // 失败兜底：answer 为空时写入失败文案，已有部分回答则保留
    const fail = (message: string) => {
      setSessions((prev) =>
        prev.map((item) =>
          item.reqId === session.reqId
            ? { ...item, answer: item.answer || message }
            : item,
        ),
      );
    };
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
      const { abort, promise } = chatStreamApi({
        question: text,
        reqId: session.reqId,
        sessionCode: code,
        scene: scene || undefined,
        history,
        onDelta: (delta) => {
          // 增量追加回答，触发气泡逐段渲染
          setSessions((prev) =>
            prev.map((item) =>
              item.reqId === session.reqId
                ? { ...item, answer: item.answer + delta }
                : item,
            ),
          );
        },
        onError: fail,
      });
      abortRef.current = abort;
      await promise;
    } catch {
      // 接口层已把 HTTP/网络/业务错误转成文案回调，这里兜底未覆盖的异常
      fail("抱歉，回答生成失败了，请重新问一次试试～");
    } finally {
      abortRef.current = null;
      // 场景为一次性标记，本次发送后重置，避免影响后续普通问答
      setScene("");
      sendingRef.current = false;
    }
  };

  return (
    <>
      <NavHeader
        title="AI 助手"
        isBack={false}
        back={<AiOutlineHistory onClick={getHistoryRecord} size={vw(22)} />}
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
            <InputPill send={sendStream} />

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

      {/* 历史记录弹框（左侧弹出，按日期分组的会话列表） */}
      <Popup
        visible={historyVisible}
        position="left"
        minHeight="100%"
        round
        onClose={() => setHistoryVisible(false)}
      >
        <HistoryPopup>
          <HistoryPopupTitle>历史记录</HistoryPopupTitle>
          {/* 列表：滚动到底部自动加载下一页 */}
          <HistoryList onScroll={handleHistoryScroll}>
            {Object.keys(sessionList).length ? (
              <>
                {Object.entries(sessionList).map(([date, items]) => (
                  <div key={date}>
                    <DateGroupTitle>{date}</DateGroupTitle>
                    {items.map((item) => (
                      <SessionCard
                        key={item.sessionCode}
                        onClick={() => handleSelectSession(item)}
                      >
                        <SessionQuestion>{item.question}</SessionQuestion>
                      </SessionCard>
                    ))}
                  </div>
                ))}
                {/* 底部加载提示：加载更多中 / 已全部加载 */}
                {historyLoading && <HistoryLoadMore>加载中...</HistoryLoadMore>}
                {!historyLoading &&
                  loadedCount > 0 &&
                  loadedCount >= historyTotal && (
                    <HistoryLoadMore>没有更多了</HistoryLoadMore>
                  )}
              </>
            ) : historyLoading ? (
              <HistoryEmpty>加载中...</HistoryEmpty>
            ) : (
              <HistoryEmpty>暂无历史记录</HistoryEmpty>
            )}
          </HistoryList>
        </HistoryPopup>
      </Popup>
    </>
  );
}
