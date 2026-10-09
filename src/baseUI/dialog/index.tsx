// 导入类型
import type { ReactNode } from "react";
// 导入样式
import {
  DialogMask,
  DialogCard,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogBtnCancel,
  DialogBtnConfirm,
} from "./styles";

interface IProps {
  /** 是否显示 */
  visible: boolean;
  /** 标题（默认"提示"） */
  title?: string;
  /** 内容文案 */
  content?: string;
  /** 确认按钮文案（默认"确认"） */
  confirmText?: string;
  /** 取消按钮文案（默认"取消"） */
  cancelText?: string;
  /** 是否显示取消按钮（默认显示，传 false 时仅一个确认按钮） */
  showCancel?: boolean;
  /** 点击确认 */
  onConfirm: () => void;
  /** 点击取消按钮 / 遮罩层 */
  onCancel?: () => void;
  /** 自定义内容（传入时替代 content 文案） */
  children?: ReactNode;
}

function Dialog(props: IProps) {
  const {
    visible,
    title = "提示",
    content,
    confirmText = "确认",
    cancelText = "取消",
    showCancel = true,
    onConfirm,
    onCancel,
    children,
  } = props;

  if (!visible) return null;

  return (
    <DialogMask onClick={() => onCancel?.()}>
      <DialogCard onClick={(e) => e.stopPropagation()}>
        <DialogTitle>{title}</DialogTitle>
        {children ? children : <DialogContent>{content}</DialogContent>}
        <DialogFooter>
          {showCancel && (
            <DialogBtnCancel onClick={() => onCancel?.()}>
              {cancelText}
            </DialogBtnCancel>
          )}
          <DialogBtnConfirm onClick={onConfirm}>{confirmText}</DialogBtnConfirm>
        </DialogFooter>
      </DialogCard>
    </DialogMask>
  );
}

export default Dialog;
