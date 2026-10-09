// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 关联宝宝页面容器 */
export const BindBabyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${vw(16)};
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/** 关联提示文案 */
export const BindTip = styled.div`
  font-size: ${vw(13)};
  color: #999;
  text-align: center;
  line-height: 1.6;
`;

/** 输入框样式 */
export const FormInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  text-align: right;
  font-size: ${vw(14)};
  color: #2d2d2d;
  background: transparent;

  &::placeholder {
    color: #ccc;
  }
`;

/** 关联按钮 */
export const BindButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${vw(12)} ${vw(0)};
  border-radius: ${vw(24)};
  background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.3);
  font-size: ${vw(16)};
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin-top: auto;

  &:active {
    opacity: 0.8;
  }
`;
