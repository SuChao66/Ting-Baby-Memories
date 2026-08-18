import { useState } from "react";
// 导入工具函数
import { getTodayDate } from "@/utils";
// 导入状态
import { useUserStore } from "@/store";

interface DialogProps {
  birthdayVisible: boolean;
  setBirthdayVisible: (visible: boolean) => void;
}

function BirthdayPicker(props: DialogProps) {
  const { birthdayVisible, setBirthdayVisible } = props;

  const { userInfo, updateUserInfo, getUserInfo } = useUserStore(
    (state) => state,
  );
  const { year, month, day } = getTodayDate();

  const [birthday] = useState<Date | null>(userInfo?.profile?.birthday || null);

  // 确认选择生日
  const handleBirthdayConfirm = async (
    _selectedOptions: unknown,
    selectedValue: (string | number | null)[],
  ) => {
    const [year, month, day] = selectedValue.map(Number);
    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
      throw new Error("请选择正确的日期");
    }

    const success = await updateUserInfo({
      id: userInfo?._id || "",
      birthday: `${year}-${month}-${day}`,
    });
    if (!success) {
      throw new Error("更新失败");
    }
    await getUserInfo();
    setBirthdayVisible(false);
  };

  return (
    <DatePicker
      title="选择生日"
      type="date"
      showChinese
      visible={birthdayVisible}
      startDate={new Date(1920, 0, 1)}
      endDate={new Date()}
      value={birthday || new Date(year, month, day)}
      onConfirm={handleBirthdayConfirm}
      onCancel={() => setBirthdayVisible(false)}
      onClose={() => setBirthdayVisible(false)}
    />
  );
}

export default BirthdayPicker;
