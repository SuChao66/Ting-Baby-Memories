import styled from "styled-components";
import { vw } from "@/utils";

/** 遮罩层 */
export const DialogMask = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/** 弹框卡片 */
export const DialogCard = styled.div`
  width: calc(100% - ${vw(24)});
  background: #fff;
  border-radius: ${vw(12)};
  padding: ${vw(16)} ${vw(24)};
  box-sizing: border-box;
`;

/** 标题 */
export const DialogTitle = styled.div`
  text-align: center;
  font-size: ${vw(18)};
  font-weight: 600;
  color: #1a1a1a;
`;

/** 内容文案 */
export const DialogContent = styled.div`
  text-align: center;
  font-size: ${vw(14)};
  color: #666;
  margin-top: ${vw(12)};
`;

/** 底部按钮区 */
export const DialogFooter = styled.div`
  display: flex;
  gap: ${vw(24)};
  margin-top: ${vw(24)};
  align-items: center;
  justify-content: center;
`;

/** 取消按钮 */
export const DialogBtnCancel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  border-radius: ${vw(12)};
  font-size: ${vw(14)};
  padding: ${vw(12)} ${vw(48)};
  color: #333;
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
`;

/** 确认按钮 */
export const DialogBtnConfirm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff2d55;
  border-radius: ${vw(12)};
  font-size: ${vw(14)};
  color: #fff;
  font-weight: 500;
  padding: ${vw(12)} ${vw(48)};
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
`;
