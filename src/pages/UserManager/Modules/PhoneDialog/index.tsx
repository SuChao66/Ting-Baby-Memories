import { useState } from "react";
// 导入store
import { useUserStore } from "@/store";
// 导入常量
import { PHONE_REGEX } from "@/enums";

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
  // 注意: NutUI Dialog 在 onConfirm 正常返回后会自动触发 onClose 关闭弹窗，
  // 校验失败或接口失败时需 reject(throw)，弹窗才会保持打开
  const handlePhoneConfirm = async () => {
    if (!phone.trim()) {
      Toast.show({ title: "手机号不能为空", icon: "warn" });
      throw new Error("手机号不能为空");
    }
    // 校验手机号格式
    if (!PHONE_REGEX.test(phone)) {
      Toast.show({ title: "手机号格式错误", icon: "warn" });
      throw new Error("手机号格式错误");
    }
    const params = {
      id: userInfo._id,
      phone,
    };
    const success = await updateUserInfo(params);
    if (!success) {
      Toast.show({ title: "手机号修改失败", icon: "error" });
      throw new Error("手机号修改失败");
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
      onClose={handlePhoneCancel}
    >
      <Input
        type="number"
        value={phone}
        placeholder="请输入手机号"
        maxLength={11}
        clearable
        onChange={setPhone}
      />
    </Dialog>
  );
}

export default PhoneDialog;
