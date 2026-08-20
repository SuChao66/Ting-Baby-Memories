// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 修改密码页面容器 */
export const ChangePasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${vw(16)};
  padding-top: ${vw(20)};
`;

/** 表单卡片 */
export const FormCard = styled.div`
  width: 100%;
  background: #fff;
  border-radius: ${vw(20)};
  padding: ${vw(28)} ${vw(20)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
`;

/** 表单项 */
export const FormItem = styled.div`
  margin-bottom: ${vw(16)};
`;

/** 输入框外层容器 */
export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${vw(48)};
  border: ${vw(1)} solid #f0f0f0;
  border-radius: ${vw(12)};
  padding: 0 ${vw(14)};
  background: #fafafa;
  transition:
    border-color 0.2s,
    background 0.2s;

  &:focus-within {
    border-color: #ff6b8a;
    background: #fff;
  }

  /* 覆盖 NutUI Input 样式 */
  .nut-input {
    flex: 1;
    padding: 0;
    background: transparent;
    border: none;
    font-size: ${vw(15)};
  }
`;

/** 输入框图标 */
export const InputIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${vw(10)};
  flex-shrink: 0;
`;

/** 密码策略提示 */
export const PasswordHint = styled.p`
  font-size: ${vw(12)};
  color: #bbb;
  line-height: 1.5;
  margin-top: ${vw(-8)};
  margin-bottom: ${vw(16)};
  padding: 0 ${vw(4)};
`;

/** 提交按钮容器 */
export const SubmitButtonWrapper = styled.div`
  margin-top: ${vw(8)};
  .submit-button {
    background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
    border: none;
  }
`;
