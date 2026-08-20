// 导入 React hooks
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// 导入图标
import { AiOutlineCamera, AiOutlineRight } from "react-icons/ai";
import { PiBabyLight } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
// 导入 vw 工具函数
import { vw, getTodayDate, formatBirthday, compressImage } from "@/utils";
// 导入通用样式组件
import { Card, CardRow, RowLabel, RowValue, RowArrow } from "@/styles/common";
// 导入页面样式组件
import {
  AddBabyContainer,
  AvatarUpload,
  AvatarBox,
  AvatarImg,
  CameraOverlay,
  FormInput,
  FormTextarea,
  RemarkContent,
  RemarkLabel,
  SaveButton,
} from "./styles";
// 导入导航栏组件
import NavHeader from "@/components/navHeader";
// 导入血型选项
import { BLOOD_TYPE_OPTIONS, GENDER_OPTIONS, RELATION_OPTIONS } from "@/enums";
// 导入上传接口
import { getPresignedUrlApi } from "@/api/upload";
// 导入类型
import type { IBabyInfo } from "@/interface/baby";
// 导入store
import { useBabyStore } from "@/store";

function AddBaby() {
  const [babyForm, setBabyForm] = useState<IBabyInfo>({
    nickname: "", // 昵称
    avatarUrl: "", // 头像
    gender: null, // 性别
    birthday: null, // 生日
    birthTime: "", // 时刻
    bloodType: null, // 血型
    birthWeight: "", // 体重
    birthHeight: "", // 身长
    allergens: "", // 过敏原
    preferences: "", // 喜好
    remarks: "", // 备注
    relation: null, // 与宝宝关系
  });
  // 弹层可见性
  const [genderVisible, setGenderVisible] = useState(false);
  const [birthdayVisible, setBirthdayVisible] = useState(false);
  const [birthTimeVisible, setBirthTimeVisible] = useState(false);
  const [bloodTypeVisible, setBloodTypeVisible] = useState(false);
  const [relationVisible, setRelationVisible] = useState(false);

  const { year, month, day } = getTodayDate();
  // 头像文件输入引用
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const { addBaby } = useBabyStore((state) => state);
  const navigate = useNavigate();

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
    // 1. 压缩
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
      setBabyForm((prev) => ({ ...prev, avatarUrl: data.accessUrl }));
    } catch {
      Toast.show({ title: "上传失败，请重试", icon: "fail" });
    } finally {
      Toast.clear();
    }
    // 清空 value，允许重复选择同一张
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
    const ok = await addBaby(babyForm);
    if (ok) {
      Toast.show({ title: "新增成功", icon: "success" });
      navigate(-1);
    }
  };

  return (
    <>
      <NavHeader title="添加宝宝" back={<IoIosArrowBack size={22} />} />
      <AddBabyContainer>
        {/* 头像上传区域 */}
        <AvatarUpload>
          <AvatarBox>
            {babyForm.avatarUrl ? (
              <img className="baby-avatar" src={babyForm.avatarUrl} alt="" />
            ) : (
              <AvatarImg onClick={openAvatarPicker}>
                <PiBabyLight color="#ff6b8a" size={vw(40)} />
                <CameraOverlay>
                  <AiOutlineCamera color="#fff" size={vw(14)} />
                </CameraOverlay>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
              </AvatarImg>
            )}
          </AvatarBox>
        </AvatarUpload>

        {/* 表单卡片 */}
        <Card>
          {/* 昵称 */}
          <CardRow>
            <RowLabel>昵称</RowLabel>
            <FormInput
              type="text"
              placeholder="请输入宝宝昵称"
              value={babyForm.nickname}
              onChange={(e) =>
                setBabyForm((prev) => ({ ...prev, nickname: e.target.value }))
              }
            />
          </CardRow>
          {/* 性别 */}
          <CardRow onClick={() => setGenderVisible(true)}>
            <RowLabel>性别</RowLabel>
            <RowValue>
              {babyForm.gender !== null
                ? babyForm.gender === 1
                  ? "男"
                  : "女"
                : "请选择"}
            </RowValue>
            <RowArrow>
              <AiOutlineRight size={vw(14)} />
            </RowArrow>
          </CardRow>
          {/* 与宝宝关系 */}
          <CardRow onClick={() => setRelationVisible(true)}>
            <RowLabel>与宝宝关系</RowLabel>
            <RowValue>
              {RELATION_OPTIONS.find((opt) => opt.value === babyForm.relation)
                ?.name || "请选择"}
            </RowValue>
            <RowArrow>
              <AiOutlineRight size={vw(14)} />
            </RowArrow>
          </CardRow>
          {/* 生日 */}
          <CardRow onClick={() => setBirthdayVisible(true)}>
            <RowLabel>生日</RowLabel>
            <RowValue>{formatBirthday(babyForm.birthday) || "请选择"}</RowValue>
            <RowArrow>
              <AiOutlineRight size={vw(14)} />
            </RowArrow>
          </CardRow>
          {/* 出生时间 */}
          <CardRow $isLast onClick={() => setBirthTimeVisible(true)}>
            <RowLabel>出生时间</RowLabel>
            <RowValue>{babyForm.birthTime || "请选择"}</RowValue>
            <RowArrow>
              <AiOutlineRight size={vw(14)} />
            </RowArrow>
          </CardRow>
        </Card>

        {/* 档案信息卡片 */}
        <Card>
          {/* 血型 */}
          <CardRow onClick={() => setBloodTypeVisible(true)}>
            <RowLabel>血型</RowLabel>
            <RowValue>{babyForm.bloodType || "请选择"}</RowValue>
            <RowArrow>
              <AiOutlineRight size={vw(14)} />
            </RowArrow>
          </CardRow>
          {/* 出生体重 */}
          <CardRow>
            <RowLabel>出生体重</RowLabel>
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
          </CardRow>
          {/* 出生身长 */}
          <CardRow>
            <RowLabel>出生身长</RowLabel>
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
          </CardRow>
          {/* 过敏原 */}
          <CardRow>
            <RowLabel>过敏原</RowLabel>
            <FormInput
              type="text"
              placeholder="如有请填写"
              value={babyForm.allergens}
              onChange={(e) =>
                setBabyForm((prev) => ({ ...prev, allergens: e.target.value }))
              }
            />
          </CardRow>
          {/* 喜好 */}
          <CardRow $isLast>
            <RowLabel>喜好</RowLabel>
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
          </CardRow>
        </Card>

        {/* 备注卡片 */}
        <Card>
          <RemarkContent>
            <RemarkLabel>备注</RemarkLabel>
            <FormTextarea
              placeholder="请输入备注信息"
              value={babyForm.remarks}
              onChange={(e) =>
                setBabyForm((prev) => ({ ...prev, remarks: e.target.value }))
              }
            />
          </RemarkContent>
        </Card>

        {/* 保存按钮 */}
        <SaveButton onClick={handleSave}>保存</SaveButton>
      </AddBabyContainer>

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

export default AddBaby;
