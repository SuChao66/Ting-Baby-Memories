// 导入 React hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// 导入 React Icons 图标
import { AiOutlineUnlock, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入样式组件
import {
  ChangePasswordContainer,
  FormCard,
  FormItem,
  InputWrapper,
  InputIcon,
  PasswordHint,
  SubmitButtonWrapper,
} from "./styles";
// 导入通用组件
import NavHeader from "@/components/navHeader";
// 导入store
import { useUserStore } from "@/store";

export default function ChangePassword() {
  const navigate = useNavigate();
  const { changePassword } = useUserStore((state) => state);

  // 表单输入值
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // 密码可见性
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // 提交处理（逻辑自行实现）
  const handleSubmit = async () => {
    const params = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    const ok = await changePassword(params);
    if (ok) {
      Toast.show({
        title: "修改密码成功，请重新登录！",
        icon: "success",
      });
      // 删除用户信息
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      navigate("/login");
    }
  };

  return (
    <>
      <NavHeader title="修改密码" />
      <ChangePasswordContainer>
        {/* 表单卡片 */}
        <FormCard>
          {/* 旧密码 */}
          <FormItem>
            <InputWrapper>
              <InputIcon>
                <AiOutlineUnlock color="#ff6b8a" size={vw(18)} />
              </InputIcon>
              <Input
                placeholder="请输入旧密码"
                type={oldPasswordVisible ? "text" : "password"}
                value={oldPassword}
                onChange={(val: string) => setOldPassword(val)}
              />
              <InputIcon
                onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
                style={{ marginRight: 0, cursor: "pointer" }}
              >
                {oldPasswordVisible ? (
                  <AiFillEye color="#ccc" size={vw(18)} />
                ) : (
                  <AiFillEyeInvisible color="#ccc" size={vw(18)} />
                )}
              </InputIcon>
            </InputWrapper>
          </FormItem>

          {/* 新密码 */}
          <FormItem>
            <InputWrapper>
              <InputIcon>
                <AiOutlineUnlock color="#ff6b8a" size={vw(18)} />
              </InputIcon>
              <Input
                placeholder="请输入新密码"
                type={newPasswordVisible ? "text" : "password"}
                value={newPassword}
                onChange={(val: string) => setNewPassword(val)}
              />
              <InputIcon
                onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                style={{ marginRight: 0, cursor: "pointer" }}
              >
                {newPasswordVisible ? (
                  <AiFillEye color="#ccc" size={vw(18)} />
                ) : (
                  <AiFillEyeInvisible color="#ccc" size={vw(18)} />
                )}
              </InputIcon>
            </InputWrapper>
          </FormItem>

          {/* 确认新密码 */}
          <FormItem>
            <InputWrapper>
              <InputIcon>
                <AiOutlineUnlock color="#ff6b8a" size={vw(18)} />
              </InputIcon>
              <Input
                placeholder="请再次输入新密码"
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

          {/* 密码策略提示 */}
          <PasswordHint>
            密码至少6位，需包含大小写字母、数字和特殊字符
          </PasswordHint>

          {/* 提交按钮 */}
          <SubmitButtonWrapper>
            <Button
              type="primary"
              shape="round"
              block
              className="submit-button"
              onClick={handleSubmit}
            >
              确认修改
            </Button>
          </SubmitButtonWrapper>
        </FormCard>
      </ChangePasswordContainer>
    </>
  );
}
