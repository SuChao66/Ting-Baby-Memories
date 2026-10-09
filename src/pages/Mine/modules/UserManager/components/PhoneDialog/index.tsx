import { useState } from "react";
// 导入store
import { useUserStore } from "@/store";
// 导入常量
import { PHONE_REGEX } from "@/enums";
// 导入工具函数
import { vw } from "@/utils";
// 导入弹窗组件
import Dialog from "@/baseUI/dialog";

interface DialogProps {
  phoneVisible: boolean;
  phoneInput: string;
  setPhoneVisible: (visible: boolean) => void;
}

function PhoneDialog(props: DialogProps) {
  const { phoneVisible, phoneInput, setPhoneVisible } = props;

  const { userInfo, updateUserInfo, getUserInfo } = useUserStore(
    (state) => state,
  );
  const [phone, setPhone] = useState(phoneInput);

  // 确认修改手机号
  // 注意: 自封装 Dialog 不会自动关闭，校验失败或接口失败时弹窗保持打开，
  // 成功后需手动调用 setPhoneVisible(false) 关闭弹窗
  const handlePhoneConfirm = async () => {
    if (!userInfo) return;
    if (!phone.trim()) {
      Toast.show({ title: "手机号不能为空", icon: "warn" });
      return;
    }
    // 校验手机号格式
    if (!PHONE_REGEX.test(phone)) {
      Toast.show({ title: "手机号格式错误", icon: "warn" });
      return;
    }
    const params = {
      id: userInfo._id,
      phone,
    };
    const success = await updateUserInfo(params);
    if (!success) {
      Toast.show({ title: "手机号修改失败", icon: "error" });
      return;
    }
    Toast.show({ title: "手机号修改成功", icon: "success" });
    setPhoneVisible(false);
    getUserInfo();
  };

  // 取消修改手机号
  const handlePhoneCancel = () => {
    setPhoneVisible(false);
    // 取消修改手机号后，将手机号重置为原始值
    setPhone(phoneInput);
  };

  return (
    <Dialog
      title="修改手机号"
      visible={phoneVisible}
      confirmText="保存"
      onConfirm={handlePhoneConfirm}
      onCancel={handlePhoneCancel}
    >
      <div style={{ marginTop: vw(12) }}>
        <Input
          type="number"
          value={phone}
          placeholder="请输入手机号"
          maxLength={11}
          clearable
          onChange={setPhone}
        />
      </div>
    </Dialog>
  );
}

export default PhoneDialog;
