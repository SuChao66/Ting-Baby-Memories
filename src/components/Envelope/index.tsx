import { useEffect, useRef, useState } from "react";
// 导入图标
import { AiFillHeart, AiOutlineLock } from "react-icons/ai";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入样式
import {
  EnvelopeContainer,
  EnvelopeFlap,
  Seal,
  EnvelopeBody,
  EnvelopeDate,
  EnvelopeSender,
  EnvelopeSenderAvatar,
  EnvelopeHint,
  RisingPaper,
} from "./styles";

interface IProps {
  /** 信封上的开启提示文案（如“2026年10月1日 开启”） */
  dateText: string;
  /** 寄件人昵称（默认“家人”） */
  senderName?: string;
  /** 寄件人头像地址 */
  avatarUrl?: string;
  /** 挂载时倒放收起动画（信纸降下 -> 翻盖合上） */
  reverse?: boolean;
  /** 拆信动画结束后回调（父组件切换到完整内容） */
  onOpenComplete?: () => void;
}

/**
 * 信封阶段
 * 正向：closed 信封 -> flipping 翻盖翻开 -> pulling 信纸升起
 * 倒放：dropping 信纸降下 -> closing 翻盖合上（蜡封恢复）-> closed
 */
type EnvelopePhase = "closed" | "flipping" | "pulling" | "dropping" | "closing";

/** 通用信封组件：点击触发翻盖 + 蜡封碎裂 + 信纸升起的拆信动画 */
function Envelope(props: IProps) {
  const {
    dateText,
    senderName = "家人",
    avatarUrl,
    reverse = false,
    onOpenComplete,
  } = props;

  // 当前阶段（倒放挂载时从信纸降下开始）
  const [phase, setPhase] = useState<EnvelopePhase>(
    reverse ? "dropping" : "closed",
  );
  // 收集定时器 id，卸载时统一清理
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const timers = timersRef.current;
    // 倒放收起：信纸降下（0.4s）后合上翻盖（0.35s），蜡封恢复
    if (reverse) {
      timers.push(window.setTimeout(() => setPhase("closing"), 450));
      timers.push(window.setTimeout(() => setPhase("closed"), 980));
    }
    return () => timers.forEach((id) => clearTimeout(id));
  }, [reverse]);

  // 翻盖/蜡封处于“已拆开”状态（dropping 时翻盖仍保持打开）
  const isOpened =
    phase === "flipping" || phase === "pulling" || phase === "dropping";

  // 拆开信封：翻盖翻开 -> 信纸升起 -> 通知父组件展示完整内容
  const handleOpen = () => {
    if (phase !== "closed") return;
    setPhase("flipping");
    // 翻盖动画（0.45s）结束后，信纸从信封中升起
    timersRef.current.push(window.setTimeout(() => setPhase("pulling"), 450));
    // 信纸升起（0.4s）结束后，展示完整信件内容
    timersRef.current.push(window.setTimeout(() => onOpenComplete?.(), 980));
  };

  return (
    <EnvelopeContainer onClick={handleOpen}>
      {/* 顶部翻盖 */}
      <EnvelopeFlap $opened={isOpened} />
      {/* 封口蜡封 */}
      <Seal $broken={isOpened}>
        <AiFillHeart size={vw(14)} />
      </Seal>
      {/* 信封正面信息（信纸升起/降下时淡出） */}
      <EnvelopeBody $hidden={phase === "pulling" || phase === "dropping"}>
        <EnvelopeDate>
          <AiOutlineLock size={vw(12)} />
          {dateText}
        </EnvelopeDate>
        <EnvelopeSender>
          <EnvelopeSenderAvatar>
            <img src={avatarUrl} alt={senderName} />
          </EnvelopeSenderAvatar>
          来自 {senderName} 的信
        </EnvelopeSender>
        <EnvelopeHint>轻触拆开信封</EnvelopeHint>
      </EnvelopeBody>
      {/* 升起/降下的信纸 */}
      {(phase === "pulling" || phase === "dropping") && (
        <RisingPaper $reverse={phase === "dropping"}>
          <EnvelopeDate>
            <AiOutlineLock size={vw(12)} />
            {dateText}
          </EnvelopeDate>
          <span>来自 {senderName} 的信件正在展开…</span>
        </RisingPaper>
      )}
    </EnvelopeContainer>
  );
}

export default Envelope;
