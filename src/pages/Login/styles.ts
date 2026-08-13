// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 登录页容器 */
export const LoginContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #ffe3ec 0%, #fff0f3 40%, #fff 100%);
  padding: ${vw(48)} ${vw(24)} ${vw(24)};
  box-sizing: border-box;
`;

/** Logo 区域 */
export const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${vw(32)};
`;

/** Logo 图标容器 */
export const LogoIcon = styled.div`
  width: ${vw(72)};
  height: ${vw(72)};
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 ${vw(8)} ${vw(20)} rgba(255, 107, 138, 0.3);
`;

/** 应用名称 */
export const AppName = styled.h1`
  font-size: ${vw(24)};
  font-weight: 700;
  color: #2d2d2d;
  margin-top: ${vw(12)};
`;

/** 应用标语 */
export const AppSlogan = styled.p`
  font-size: ${vw(13)};
  color: #999;
  margin-top: ${vw(4)};
`;

/** 表单卡片 */
export const FormCard = styled.div`
  width: 100%;
  background: #fff;
  border-radius: ${vw(20)};
  padding: ${vw(28)} ${vw(20)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
`;

/** 表单标题 */
export const FormTitle = styled.h2`
  font-size: ${vw(20)};
  font-weight: 600;
  color: #2d2d2d;
  text-align: center;
  margin-bottom: ${vw(6)};
`;

/** 表单副标题 */
export const FormSubtitle = styled.p`
  font-size: ${vw(13)};
  color: #999;
  text-align: center;
  margin-bottom: ${vw(24)};
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

  .nut-input-disabled {
    color: #c8c9cc;
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
  margin-bottom: ${vw(16)};
  .submit-button {
    background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
    border: none;
  }
`;

/** 底部链接区域 */
export const FooterLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/** 底部链接 */
export const FooterLink = styled.span`
  font-size: ${vw(13)};
  color: #ff6b8a;
  cursor: pointer;
`;
