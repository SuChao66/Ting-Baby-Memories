// 导入样式（集中定义于上级目录 styles.ts）
import {
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyTip,
  RetryButton,
} from "./styles";

interface IProps {
  /** 是否为加载失败态（切换文案并显示重试按钮） */
  error?: boolean;
  /** 重试回调 */
  onRetry?: () => void;
  /** 去增加记录回调（仅无数据空态显示按钮） */
  onAdd?: () => void;
}

/** 3D 胶囊空态：无记录引导 / 加载失败重试 */
function CapsuleEmpty(props: IProps) {
  const { error = false, onRetry, onAdd } = props;

  return (
    <EmptyState>
      <EmptyIcon />
      <EmptyTitle>{error ? "星光被乌云遮住了" : "还没有时光胶囊"}</EmptyTitle>
      <EmptyTip>
        {error
          ? "网络似乎不太顺畅，稍后再试试吧"
          : "去记录宝宝的成长点滴\n这里会升起属于你们的星空"}
      </EmptyTip>
      {error && onRetry && (
        <RetryButton onClick={onRetry}>重新加载</RetryButton>
      )}
      {!error && onAdd && <RetryButton onClick={onAdd}>去记录</RetryButton>}
    </EmptyState>
  );
}

export default CapsuleEmpty;
