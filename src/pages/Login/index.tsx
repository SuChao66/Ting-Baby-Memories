// 导入 React hooks
import { useState } from "react";
// 导入 NutUI 图标
import {
  AiOutlineUser,
  AiOutlineUnlock,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import { PiBabyLight } from "react-icons/pi";
// 导入样式组件
import {
  LoginContainer,
  LogoSection,
  LogoIcon,
  AppName,
  AppSlogan,
  FormCard,
  FormTitle,
  FormSubtitle,
  FormItem,
  InputWrapper,
  InputIcon,
  PasswordHint,
  SubmitButtonWrapper,
  FooterLinks,
  FooterLink,
} from "./styles";
// 导入表单模式类型
import type { Mode } from "@/types";
// 导入工具函数
import { vw } from "@/utils";

export default function Login() {
  // 当前表单模式
  const [mode, setMode] = useState<Mode>("login");
  // 表单输入值
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // 密码可见性
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // TODO: 以下为业务逻辑处理函数，由开发者补充
  const handleLogin = () => {};
  const handleRegister = () => {};
  const handleForgotPassword = () => {};

  // 表单提交
  const handleSubmit = () => {
    if (mode === "login") handleLogin();
    else if (mode === "register") handleRegister();
    else handleForgotPassword();
  };

  // 切换模式时重置表单
  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setPasswordVisible(false);
    setConfirmPasswordVisible(false);
  };

  // 获取标题
  const getTitle = () => {
    if (mode === "login") return "欢迎回来";
    if (mode === "register") return "创建账号";
    return "重置密码";
  };

  // 获取副标题
  const getSubtitle = () => {
    if (mode === "login") return "登录以记录宝贝的每个瞬间";
    if (mode === "register") return "注册以开始记录宝贝成长";
    return "输入新密码以重置您的账号";
  };

  // 获取按钮文字
  const getButtonText = () => {
    if (mode === "login") return "登录";
    if (mode === "register") return "注册";
    return "重置密码";
  };

  // 密码输入框 placeholder
  const getPasswordPlaceholder = () => {
    return mode === "forgotPassword" ? "请输入新密码" : "请输入密码";
  };

  return (
    <LoginContainer>
      {/* Logo 区域 */}
      <LogoSection>
        <LogoIcon>
          <PiBabyLight color="#fff" size={vw(36)} />
        </LogoIcon>
        <AppName>汀宝宝记忆</AppName>
        <AppSlogan>记录宝贝成长的每个瞬间</AppSlogan>
      </LogoSection>

      {/* 表单卡片 */}
      <FormCard>
        <FormTitle>{getTitle()}</FormTitle>
        <FormSubtitle>{getSubtitle()}</FormSubtitle>

        {/* 用户名 */}
        <FormItem>
          <InputWrapper>
            <InputIcon>
              <AiOutlineUser color="#ff6b8a" size={vw(18)} />
            </InputIcon>
            <Input
              placeholder="请输入用户名"
              value={username}
              onChange={(val: string) => setUsername(val)}
              clearable
            />
          </InputWrapper>
        </FormItem>

        {/* 密码 */}
        <FormItem>
          <InputWrapper>
            <InputIcon>
              <AiOutlineUnlock color="#ff6b8a" size={vw(18)} />
            </InputIcon>
            <Input
              placeholder={getPasswordPlaceholder()}
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(val: string) => setPassword(val)}
            />
            <InputIcon
              onClick={() => setPasswordVisible(!passwordVisible)}
              style={{ marginRight: 0, cursor: "pointer" }}
            >
              {passwordVisible ? (
                <AiFillEye color="#ccc" size={vw(18)} />
              ) : (
                <AiFillEyeInvisible color="#ccc" size={vw(18)} />
              )}
            </InputIcon>
          </InputWrapper>
        </FormItem>

        {/* 确认密码（注册 & 忘记密码） */}
        {mode !== "login" && (
          <FormItem>
            <InputWrapper>
              <InputIcon>
                <AiOutlineUnlock color="#ff6b8a" size={vw(18)} />
              </InputIcon>
              <Input
                placeholder="请再次输入密码"
                type={confirmPasswordVisible ? "text" : "password"}
                value={confirmPassword}
                onChange={(val: string) => setConfirmPassword(val)}
              />
              <InputIcon
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                style={{ marginRight: 0, cursor: "pointer" }}
              >
                {confirmPasswordVisible ? (
                  <AiFillEye color="#ccc" size={vw(18)} />
                ) : (
                  <AiFillEyeInvisible color="#ccc" size={vw(18)} />
                )}
              </InputIcon>
            </InputWrapper>
          </FormItem>
        )}

        {/* 密码策略提示（注册 & 忘记密码） */}
        {mode !== "login" && (
          <PasswordHint>
            密码至少6位，需包含大小写字母、数字和特殊字符
          </PasswordHint>
        )}

        {/* 提交按钮 */}
        <SubmitButtonWrapper>
          <Button
            type="primary"
            shape="round"
            block
            className="submit-button"
            onClick={handleSubmit}
          >
            {getButtonText()}
          </Button>
        </SubmitButtonWrapper>

        {/* 底部链接 */}
        <FooterLinks>
          {mode === "login" ? (
            <>
              <FooterLink onClick={() => switchMode("register")}>
                还没有账号？去注册
              </FooterLink>
              <FooterLink onClick={() => switchMode("forgotPassword")}>
                忘记密码？
              </FooterLink>
            </>
          ) : (
            <FooterLink
              onClick={() => switchMode("login")}
              style={{ margin: "0 auto" }}
            >
              已有账号？返回登录
            </FooterLink>
          )}
        </FooterLinks>
      </FormCard>
    </LoginContainer>
  );
}
