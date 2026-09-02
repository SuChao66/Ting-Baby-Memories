import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
// 导入图标
import { AiOutlineCamera, AiOutlineRight } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { PiBabyLight } from "react-icons/pi";
import { IoFemale, IoMale } from "react-icons/io5";
import { IoMdClose, IoIosArrowBack, IoMdCopy } from "react-icons/io";
// 导入 vw 工具函数
import {
  vw,
  getTodayDate,
  formatBirthday,
  compressImage,
  copyToClipboard,
} from "@/utils";
// 导入通用样式组件
import { Card, CardRow, RowLabel, RowValue, RowArrow } from "@/styles/common";
// 导入页面样式组件
import {
  BabyFileContainer,
  ProfileBanner,
  BannerAvatar,
  BannerInfo,
  BannerNameRow,
  BannerName,
  BannerBirthday,
  BannerBabyNo,
  CardTitle,
  RemarkContent,
  RemarkText,
  FormInput,
  FormTextarea,
  SaveButton,
} from "./styles";
// 导入导航栏组件
import NavHeader from "@/components/navHeader";
// 导入枚举
import { BLOOD_TYPE_OPTIONS, GENDER_OPTIONS, RELATION_OPTIONS } from "@/enums";
// 导入上传接口
import { getPresignedUrlApi } from "@/api/upload";
// 导入store
import { useBabyStore } from "@/store";
// 导入类型
import type { IBabyInfo } from "@/interface/baby";

function BabyFile() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [babyForm, setBabyForm] = useState<IBabyInfo>({
    nickname: "",
    avatarUrl: "",
    gender: null,
    birthday: null,
    birthTime: "",
    bloodType: null,
    birthWeight: "",
    birthHeight: "",
    allergens: "",
    preferences: "",
    remarks: "",
    relation: null,
  });

  // 弹层可见性
  const [genderVisible, setGenderVisible] = useState(false);
  const [birthdayVisible, setBirthdayVisible] = useState(false);
  const [birthTimeVisible, setBirthTimeVisible] = useState(false);
  const [bloodTypeVisible, setBloodTypeVisible] = useState(false);
  const [relationVisible, setRelationVisible] = useState(false);

  const { year, month, day } = getTodayDate();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const { getBabyInfo, updateBabyInfo } = useBabyStore((state) => state);

  // 获取宝宝信息
  const getBabyInfos = () => {
    getBabyInfo({ id: id! }).then((data) => {
      if (!data) return;
      setBabyForm({
        nickname: data.nickname || "",
        avatarUrl: data.avatarUrl || "",
        gender: data.gender === 0 || data.gender === 1 ? data.gender : null,
        birthday: data.birthday ? new Date(data.birthday) : null,
        birthTime: data.birthTime || "",
        bloodType: data.profile?.bloodType || null,
        birthWeight: data.profile?.birthWeight
          ? String(data.profile.birthWeight)
          : "",
        birthHeight: data.profile?.birthHeight
          ? String(data.profile.birthHeight)
          : "",
        allergens: data.profile?.allergens || "",
        preferences: data.profile?.preferences || "",
        remarks: data.profile?.remarks || "",
        relation: (data.relation as IBabyInfo["relation"]) || null,
      });
    });
  };

  // 获取宝宝信息并填充表单
  useEffect(() => {
    if (!id) return;
    getBabyInfos();
  }, [id]);

  // 打开头像选择（仅编辑模式下）
  const openAvatarPicker = () => {
    if (!isEditing) return;
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
    let compressed = file;
    try {
      compressed = await compressImage(file, 0.8);
    } catch {
      console.log("压缩失败，使用原图");
    }
    Toast.show({ title: "上传中...", icon: "loading", duration: 0 });
    try {
      const { data } = await getPresignedUrlApi({
        filename: compressed.name,
        contentType: compressed.type,
      });
      const res = await fetch(data.uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": compressed.type,
          "x-cos-acl": "public-read",
        },
        body: compressed,
      });
      if (!res.ok) throw new Error("上传失败");
      setBabyForm((prev) => ({ ...prev, avatarUrl: data.accessUrl }));
    } catch {
      Toast.show({ title: "上传失败，请重试", icon: "fail" });
    } finally {
      Toast.clear();
    }
    e.target.value = "";
  };

  // 性别选择
  const handleGenderSelect = (
    _item: Record<string, string | boolean>,
    index: number,
  ) => {
    setBabyForm((prev) => ({ ...prev, gender: index === 0 ? 0 : 1 }));
    setGenderVisible(false);
  };

  // 生日选择确认
  const handleBirthdayConfirm = (
    _selectedOptions: unknown,
    selectedValue: (string | number | null)[],
  ) => {
    const [y, m, d] = selectedValue.map(Number);
    if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return;
    setBabyForm((prev) => ({ ...prev, birthday: new Date(y, m - 1, d) }));
    setBirthdayVisible(false);
  };

  // 血型选择
  const handleBloodTypeSelect = (item: Record<string, string | boolean>) => {
    setBabyForm((prev) => ({ ...prev, bloodType: item.name as string }));
    setBloodTypeVisible(false);
  };

  // 关系选择
  const handleRelationSelect = (item: Record<string, string | boolean>) => {
    setBabyForm((prev) => ({
      ...prev,
      relation: item.value as IBabyInfo["relation"],
    }));
    setRelationVisible(false);
  };

  // 出生时间选择确认
  const handleBirthTimeConfirm = (
    _selectedOptions: unknown,
    selectedValue: (string | number | null)[],
  ) => {
    const [h, m] = selectedValue.map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) return;
    const hh = `${h}`.padStart(2, "0");
    const mm = `${m}`.padStart(2, "0");
    setBabyForm((prev) => ({ ...prev, birthTime: `${hh}:${mm}:00` }));
    setBirthTimeVisible(false);
  };

  // 保存
  const handleSave = async () => {
    if (!babyForm.nickname) {
      Toast.show({ title: "请输入宝宝昵称", icon: "fail" });
      return;
    }
    if (babyForm.gender === null) {
      Toast.show({ title: "请选择宝宝性别", icon: "fail" });
      return;
    }
    if (!babyForm.birthday) {
      Toast.show({ title: "请设置宝宝生日", icon: "fail" });
      return;
    }
    if (!babyForm.relation) {
      Toast.show({ title: "请选择与宝宝的关系", icon: "fail" });
      return;
    }
    const ok = await updateBabyInfo({ ...babyForm, id: id! });
    if (ok) {
      Toast.show({ title: "保存成功", icon: "success" });
      setIsEditing(false);
    }
  };

  // 取消保存
  const handleClose = () => {
    setIsEditing(false);
    getBabyInfos();
  };

  // 复制宝宝号（显示省略，复制完整）
  const handleCopyBabyNo = async () => {
    const ok = await copyToClipboard(id || "");
    Toast.show({
      title: ok ? "复制成功" : "复制失败",
      icon: ok ? "success" : "fail",
    });
  };

  return (
    <>
      <NavHeader
        title="宝宝档案"
        back={<IoIosArrowBack size={22} />}
        right={
          !isEditing ? (
            <CiEdit
              size={22}
              color="#2d2d2d"
              onClick={() => setIsEditing(true)}
            />
          ) : (
            <IoMdClose
              size={22}
              color="#2d2d2d"
              onClick={() => handleClose()}
            />
          )
        }
      />
      <BabyFileContainer>
        {/* 宝宝信息横幅 */}
        <ProfileBanner onClick={openAvatarPicker}>
          <BannerAvatar>
            {babyForm.avatarUrl ? (
              <img src={babyForm.avatarUrl} alt="头像" className="avatar" />
            ) : (
              <PiBabyLight color="#ff6b8a" size={vw(32)} />
            )}
            {isEditing && (
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            )}
          </BannerAvatar>
          <BannerInfo>
            <BannerNameRow>
              <BannerName>{babyForm.nickname || "未设置"}</BannerName>
              {babyForm.gender === 0 ? (
                <IoFemale color="#fff" size={vw(16)} />
              ) : babyForm.gender === 1 ? (
                <IoMale color="#fff" size={vw(16)} />
              ) : null}
            </BannerNameRow>
            <BannerBirthday>
              生日：{formatBirthday(babyForm.birthday) || "未设置"}
            </BannerBirthday>
            <BannerBabyNo>
              <span className="no">宝宝号：{id}</span>
              <IoMdCopy
                className="copy-icon"
                onClick={() => handleCopyBabyNo()}
              />
            </BannerBabyNo>
          </BannerInfo>
          {isEditing && (
            <AiOutlineCamera
              color="#fff"
              size={vw(20)}
              style={{ marginLeft: "auto", opacity: 0.8 }}
            />
          )}
        </ProfileBanner>

        {/* 基本信息 */}
        <CardTitle>基本信息</CardTitle>
        <Card>
          {/* 昵称 */}
          <CardRow>
            <RowLabel>昵称</RowLabel>
            {isEditing ? (
              <FormInput
                type="text"
                placeholder="请输入宝宝昵称"
                value={babyForm.nickname}
                onChange={(e) =>
                  setBabyForm((prev) => ({
                    ...prev,
                    nickname: e.target.value,
                  }))
                }
              />
            ) : (
              <RowValue>{babyForm.nickname || "未设置"}</RowValue>
            )}
          </CardRow>
          {/* 性别 */}
          <CardRow
            onClick={isEditing ? () => setGenderVisible(true) : undefined}
          >
            <RowLabel>性别</RowLabel>
            <RowValue>
              {babyForm.gender !== null
                ? babyForm.gender === 1
                  ? "男"
                  : "女"
                : isEditing
                  ? "请选择"
                  : "未设置"}
            </RowValue>
            {isEditing && (
              <RowArrow>
                <AiOutlineRight size={vw(14)} />
              </RowArrow>
            )}
          </CardRow>
          {/* 与宝宝关系 */}
          <CardRow
            onClick={isEditing ? () => setRelationVisible(true) : undefined}
          >
            <RowLabel>与宝宝关系</RowLabel>
            <RowValue>
              {RELATION_OPTIONS.find((opt) => opt.value === babyForm.relation)
                ?.name || (isEditing ? "请选择" : "未设置")}
            </RowValue>
            {isEditing && (
              <RowArrow>
                <AiOutlineRight size={vw(14)} />
              </RowArrow>
            )}
          </CardRow>
          {/* 生日 */}
          <CardRow
            onClick={isEditing ? () => setBirthdayVisible(true) : undefined}
          >
            <RowLabel>生日</RowLabel>
            <RowValue>
              {formatBirthday(babyForm.birthday) ||
                (isEditing ? "请选择" : "未设置")}
            </RowValue>
            {isEditing && (
              <RowArrow>
                <AiOutlineRight size={vw(14)} />
              </RowArrow>
            )}
          </CardRow>
          {/* 出生时间 */}
          <CardRow
            $isLast
            onClick={isEditing ? () => setBirthTimeVisible(true) : undefined}
          >
            <RowLabel>出生时间</RowLabel>
            <RowValue>
              {babyForm.birthTime || (isEditing ? "请选择" : "未设置")}
            </RowValue>
            {isEditing && (
              <RowArrow>
                <AiOutlineRight size={vw(14)} />
              </RowArrow>
            )}
          </CardRow>
        </Card>

        {/* 健康信息 */}
        <CardTitle>健康信息</CardTitle>
        <Card>
          {/* 血型 */}
          <CardRow
            onClick={isEditing ? () => setBloodTypeVisible(true) : undefined}
          >
            <RowLabel>血型</RowLabel>
            <RowValue>
              {babyForm.bloodType || (isEditing ? "请选择" : "未设置")}
            </RowValue>
            {isEditing && (
              <RowArrow>
                <AiOutlineRight size={vw(14)} />
              </RowArrow>
            )}
          </CardRow>
          {/* 出生体重 */}
          <CardRow>
            <RowLabel>出生体重</RowLabel>
            {isEditing ? (
              <FormInput
                type="number"
                placeholder="kg"
                value={babyForm.birthWeight}
                onChange={(e) =>
                  setBabyForm((prev) => ({
                    ...prev,
                    birthWeight: e.target.value,
                  }))
                }
              />
            ) : (
              <RowValue>
                {babyForm.birthWeight ? `${babyForm.birthWeight} kg` : "未设置"}
              </RowValue>
            )}
          </CardRow>
          {/* 出生身长 */}
          <CardRow $isLast>
            <RowLabel>出生身长</RowLabel>
            {isEditing ? (
              <FormInput
                type="number"
                placeholder="cm"
                value={babyForm.birthHeight}
                onChange={(e) =>
                  setBabyForm((prev) => ({
                    ...prev,
                    birthHeight: e.target.value,
                  }))
                }
              />
            ) : (
              <RowValue>
                {babyForm.birthHeight ? `${babyForm.birthHeight} cm` : "未设置"}
              </RowValue>
            )}
          </CardRow>
        </Card>

        {/* 其他信息 */}
        <CardTitle>其他信息</CardTitle>
        <Card>
          {/* 过敏原 */}
          <CardRow>
            <RowLabel>过敏原</RowLabel>
            {isEditing ? (
              <FormInput
                type="text"
                placeholder="如有请填写"
                value={babyForm.allergens}
                onChange={(e) =>
                  setBabyForm((prev) => ({
                    ...prev,
                    allergens: e.target.value,
                  }))
                }
              />
            ) : (
              <RowValue>{babyForm.allergens || "无"}</RowValue>
            )}
          </CardRow>
          {/* 喜好 */}
          <CardRow $isLast>
            <RowLabel>喜好</RowLabel>
            {isEditing ? (
              <FormInput
                type="text"
                placeholder="请输入喜好"
                value={babyForm.preferences}
                onChange={(e) =>
                  setBabyForm((prev) => ({
                    ...prev,
                    preferences: e.target.value,
                  }))
                }
              />
            ) : (
              <RowValue>{babyForm.preferences || "未设置"}</RowValue>
            )}
          </CardRow>
        </Card>

        {/* 备注 */}
        <Card>
          <RemarkContent>
            {isEditing ? (
              <FormTextarea
                placeholder="请输入备注信息"
                value={babyForm.remarks}
                onChange={(e) =>
                  setBabyForm((prev) => ({ ...prev, remarks: e.target.value }))
                }
              />
            ) : (
              <RemarkText>{babyForm.remarks || "暂无备注"}</RemarkText>
            )}
          </RemarkContent>
        </Card>

        {/* 保存按钮 */}
        {isEditing && <SaveButton onClick={handleSave}>保存</SaveButton>}
      </BabyFileContainer>

      {/* 性别选择 */}
      <ActionSheet
        visible={genderVisible}
        options={GENDER_OPTIONS}
        cancelText="取消"
        onSelect={handleGenderSelect}
        onCancel={() => setGenderVisible(false)}
      />

      {/* 生日选择器 */}
      <DatePicker
        title="选择生日"
        type="date"
        showChinese
        visible={birthdayVisible}
        startDate={new Date(1920, 0, 1)}
        endDate={new Date()}
        value={babyForm.birthday || new Date(year, month, day)}
        onConfirm={handleBirthdayConfirm}
        onCancel={() => setBirthdayVisible(false)}
        onClose={() => setBirthdayVisible(false)}
      />

      {/* 出生时间选择器 */}
      <DatePicker
        title="选择出生时间"
        type="time"
        showChinese
        visible={birthTimeVisible}
        value={
          babyForm.birthTime
            ? new Date(`2020-01-01 ${babyForm.birthTime}`)
            : new Date(2020, 0, 1, 0, 0)
        }
        onConfirm={handleBirthTimeConfirm}
        onCancel={() => setBirthTimeVisible(false)}
        onClose={() => setBirthTimeVisible(false)}
      />

      {/* 血型选择 */}
      <ActionSheet
        visible={bloodTypeVisible}
        options={BLOOD_TYPE_OPTIONS}
        cancelText="取消"
        onSelect={handleBloodTypeSelect}
        onCancel={() => setBloodTypeVisible(false)}
      />

      {/* 与宝宝关系选择 */}
      <ActionSheet
        visible={relationVisible}
        options={RELATION_OPTIONS}
        cancelText="取消"
        onSelect={handleRelationSelect}
        onCancel={() => setRelationVisible(false)}
      />
    </>
  );
}

export default BabyFile;
