import { useRef, useState } from "react";
// 导入图标
import { AiOutlineUser, AiOutlineRight } from "react-icons/ai";
// 导入 vw 工具函数
import { vw, formatBirthday, compressImage } from "@/utils";
// 导入上传接口
import { getPresignedUrlApi } from "@/api/upload";
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
import NavHeader from "@/components/navHeader";
import NicknameDialog from "./Modules/NicknameDialog";
import PhoneDialog from "./Modules/PhoneDialog";
import GenderSheet from "./Modules/GenderSheet";
import BirthdayPicker from "./Modules/BirthdayPicker";

function UserManager() {
  const { userInfo, updateUserInfo, getUserInfo } = useUserStore(
    (state) => state,
  );

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

  // 头像上传处理
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      Toast.show({ title: "请选择图片文件", icon: "warn" });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      Toast.show({ title: "图片不能超过 10MB", icon: "warn" });
      return;
    }
    // 1. 本地即时预览
    const previewUrl = URL.createObjectURL(file);
    setAvatarUrl(previewUrl);
    // 2. 压缩
    let compressed = file;
    try {
      compressed = await compressImage(file, 0.8);
    } catch {
      // 压缩失败回退用原图
      console.log("压缩失败，使用原图");
    }
    // 3. 获取预签名地址并上传
    Toast.show({ title: "上传中...", icon: "loading", duration: 0 });
    try {
      // 获取预签名上传地址
      const { data } = await getPresignedUrlApi({
        filename: compressed.name,
        contentType: compressed.type,
      });
      // 4. 直传对象存储（必须用原生 fetch，不能走 axios 实例）
      const res = await fetch(data.uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": compressed.type,
          "x-cos-acl": "public-read",
        },
        body: compressed,
      });
      if (!res.ok) throw new Error("上传失败");

      // 5. 更新用户资料
      const ok = await updateUserInfo({
        id: userInfo!._id,
        avatarUrl: data.accessUrl,
      });
      if (ok) {
        setAvatarUrl(data.accessUrl);
        getUserInfo();
      }
    } catch {
      Toast.show({ title: "上传失败，请重试", icon: "fail" });
      // 回退到旧头像
      setAvatarUrl(userInfo?.avatarUrl || null);
    } finally {
      // 释放预览对象 URL，避免内存泄漏
      URL.revokeObjectURL(previewUrl);
      Toast.clear();
    }
    // 清空 value，允许重复选择同一张
    e.target.value = "";
  };

  return (
    <UserContainer>
      <NavHeader title="用户信息" />
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
          <RowValue>
            {formatBirthday(birthday || userInfo?.profile.birthday) || "未设置"}
          </RowValue>
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

export default UserManager;
