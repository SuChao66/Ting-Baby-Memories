import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineUser, AiOutlineRight } from "react-icons/ai";
// 导入 vw 工具函数
import { vw, formatBirthday } from "@/utils";
// 导入状态
import { useUserStore } from "@/store";
// 导入通用样式组件
import {
  Card,
  CardRow,
  RowLabel,
  RowValue,
  RowAvatar,
  RowArrow,
} from "@/styles/common";
// 导入样式
import { UserContainer } from "./styls";
// 导入组件
import NicknameDialog from "./Modules/NicknameDialog";
import PhoneDialog from "./Modules/PhoneDialog";
import GenderSheet from "./Modules/GenderSheet";
import BirthdayPicker from "./Modules/BirthdayPicker";

function User() {
  const navigate = useNavigate();
  const { userInfo } = useUserStore((state) => state);

  // 本地编辑状态（优先级高于 store 中的 userInfo）
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    userInfo?.avatarUrl || null,
  );
  const [nickname] = useState(userInfo?.nickname || "");
  const [gender] = useState<0 | 1 | null>(userInfo?.gender || null);
  const [birthday] = useState<Date | null>(userInfo?.profile?.birthday || null);
  const [phone] = useState(userInfo?.phone || "");

  // 弹层可见性
  const [nicknameVisible, setNicknameVisible] = useState(false);
  const [genderVisible, setGenderVisible] = useState(false);
  const [birthdayVisible, setBirthdayVisible] = useState(false);
  const [phoneVisible, setPhoneVisible] = useState(false);

  // 头像文件输入引用
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // 打开头像选择
  const openAvatarPicker = () => {
    avatarInputRef.current?.click();
  };

  // 头像文件选择后转 base64 预览
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      Toast.show({ title: "请选择图片文件", icon: "warn" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    // 清空 value，允许重复选择同一张
    e.target.value = "";
  };

  // 返回上一页
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <UserContainer>
      <NavBar
        title="用户信息"
        back={<IoIosArrowBack size={22} />}
        onBackClick={handleBack}
      />
      {/* 我的资料卡片 */}
      <Card>
        {/* 头像：点击整行选择图片并预览 */}
        <CardRow onClick={openAvatarPicker}>
          <RowLabel>头像</RowLabel>
          <RowValue>
            {avatarUrl || userInfo?.avatarUrl ? (
              <RowAvatar>
                <img src={avatarUrl} alt="头像" className="avatar" />
              </RowAvatar>
            ) : (
              <RowAvatar>
                <AiOutlineUser color="#ff6b8a" size={vw(18)} />
              </RowAvatar>
            )}
          </RowValue>
          <RowArrow>
            <AiOutlineRight size={vw(14)} />
          </RowArrow>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
        </CardRow>
        {/* 昵称 */}
        <CardRow onClick={() => setNicknameVisible(true)}>
          <RowLabel>昵称</RowLabel>
          <RowValue>{nickname || userInfo?.nickname || "未设置"}</RowValue>
          <RowArrow>
            <AiOutlineRight size={vw(14)} />
          </RowArrow>
        </CardRow>
        {/* 性别 */}
        <CardRow onClick={() => setGenderVisible(true)}>
          <RowLabel>性别</RowLabel>
          <RowValue>
            {gender !== null
              ? gender === 1
                ? "男"
                : "女"
              : userInfo?.gender === 1
                ? "男"
                : userInfo?.gender === 0
                  ? "女"
                  : "未设置"}
          </RowValue>
          <RowArrow>
            <AiOutlineRight size={vw(14)} />
          </RowArrow>
        </CardRow>
        {/* 生日 */}
        <CardRow onClick={() => setBirthdayVisible(true)}>
          <RowLabel>生日</RowLabel>
          <RowValue>{formatBirthday(birthday) || "未设置"}</RowValue>
          <RowArrow>
            <AiOutlineRight size={vw(14)} />
          </RowArrow>
        </CardRow>
        {/* 手机号 */}
        <CardRow $isLast onClick={() => setPhoneVisible(true)}>
          <RowLabel>手机号</RowLabel>
          <RowValue>{phone || userInfo?.phone || "未设置"}</RowValue>
          <RowArrow>
            <AiOutlineRight size={vw(14)} />
          </RowArrow>
        </CardRow>
      </Card>

      {/* 昵称编辑弹窗 */}
      <NicknameDialog
        nicknameVisible={nicknameVisible}
        nicknameInput={nickname}
        setNicknameVisible={setNicknameVisible}
      />

      {/* 性别选择 */}
      <GenderSheet
        genderVisible={genderVisible}
        setGenderVisible={setGenderVisible}
      />

      {/* 生日选择器 */}
      <BirthdayPicker
        birthdayVisible={birthdayVisible}
        setBirthdayVisible={setBirthdayVisible}
      />

      {/* 手机号编辑弹窗 */}
      <PhoneDialog
        phoneVisible={phoneVisible}
        phoneInput={phone}
        setPhoneVisible={setPhoneVisible}
      />
    </UserContainer>
  );
}

export default User;
