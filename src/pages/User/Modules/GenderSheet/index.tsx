// 导入store
import { useUserStore } from "@/store";

interface DialogProps {
  genderVisible: boolean;
  setGenderVisible: (visible: boolean) => void;
}

function GenderSheet(props: DialogProps) {
  const { genderVisible, setGenderVisible } = props;
  const { userInfo, updateUserInfo, getUserInfo } = useUserStore(
    (state) => state,
  );

  // 处理性别选择
  // 注意: ActionSheet 在 onSelect 正常返回后会自动触发 onClose 关闭弹窗，
  // 校验失败或接口失败时需 reject(throw)，弹窗才会保持打开
  const handleGenderSelect = async (
    _item: Record<string, string | boolean>,
    index: number,
  ) => {
    const success = await updateUserInfo({
      id: userInfo?._id,
      gender: index === 0 ? 1 : 0,
    });
    if (!success) {
      Toast.show({ title: "修改失败", icon: "warn" });
      throw new Error("修改失败");
    }
    Toast.show({ title: "修改成功", icon: "success" });
    getUserInfo();
    setGenderVisible(false);
  };

  return (
    <ActionSheet
      visible={genderVisible}
      options={[{ name: "男" }, { name: "女" }]}
      cancelText="取消"
      onSelect={handleGenderSelect}
      onCancel={() => setGenderVisible(false)}
    />
  );
}

export default GenderSheet;
