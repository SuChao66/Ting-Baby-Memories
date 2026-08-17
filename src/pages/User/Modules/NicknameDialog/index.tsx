import { useState } from "react";
// 导入store
import { useUserStore } from "@/store";

// 昵称编辑props
interface DialogProps {
  nicknameVisible: boolean;
  nicknameInput: string;
  setNicknameVisible: (visible: boolean) => void;
}

function NicknameDialog(props: DialogProps) {
  const { nicknameVisible, nicknameInput, setNicknameVisible } = props;

  const { userInfo, updateUserInfo, getUserInfo } = useUserStore(
    (state) => state,
  );
  const [nickname, setNickname] = useState(nicknameInput);

  // 确认修改昵称
  const handleNicknameConfirm = async () => {
    if (!nickname.trim()) {
      Toast.show({ title: "昵称不能为空", icon: "warn" });
      throw new Error("昵称不能为空");
    }
    const params = {
      id: userInfo._id,
      nickname,
    };
    const success = await updateUserInfo(params);
    if (!success) {
      Toast.show({ title: "昵称更新失败", icon: "error" });
      throw new Error("昵称更新失败");
    }
    Toast.show({ title: "昵称更新成功", icon: "success" });
    setNicknameVisible(false);
    getUserInfo();
  };

  // 取消/关闭修改昵称
  const handleNicknameClose = () => {
    setNickname(nicknameInput);
    setNicknameVisible(false);
  };

  // 设置昵称输入值
  const handleSetNickname = (nickname: string) => {
    setNickname(nickname);
  };

  return (
    <Dialog
      title="修改昵称"
      visible={nicknameVisible}
      confirmText="保存"
      onConfirm={() => handleNicknameConfirm()}
      onCancel={() => handleNicknameClose()}
      onClose={() => handleNicknameClose()}
    >
      <Input
        value={nickname}
        placeholder="请输入昵称"
        maxLength={20}
        clearable
        onChange={(val) => handleSetNickname(val)}
      />
    </Dialog>
  );
}

export default NicknameDialog;
