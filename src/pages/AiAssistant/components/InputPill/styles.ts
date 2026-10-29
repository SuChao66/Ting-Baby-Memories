import styled from "styled-components";
import { vw } from "@/utils";

/** 输入胶囊 */
export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(10)};
  padding: ${vw(6)} ${vw(6)} ${vw(6)} ${vw(14)};
  border-radius: ${vw(24)};
  background: #fff;
  border: 1px solid #ffd3dd;
  box-shadow: 0 ${vw(4)} ${vw(16)} rgba(255, 107, 138, 0.12);
`;

/** 输入框 */
export const InputField = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${vw(14)};
  color: #2d2d2d;

  &::placeholder {
    color: #c0c0c0;
  }
`;

/** 发送按钮 */
export const SendButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${vw(36)};
  height: ${vw(36)};
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
  flex-shrink: 0;
  cursor: pointer;

  &:active {
    transform: scale(0.94);
  }
`;
