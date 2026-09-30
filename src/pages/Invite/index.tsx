// 导入 React hooks
import { useState } from "react";
// 导入图标
import { AiOutlineUser } from "react-icons/ai";
import { PiBabyLight } from "react-icons/pi";
// 导入样式组件
import {
  InviteContainer,
  HeaderSection,
  InviterAvatar,
  InviterAvatarImg,
  InviteTitle,
  InviteSubtitle,
  BabyCard,
  BabyAvatar,
  BabyName,
  BabyAge,
  FamilyPreview,
  FormCard,
  FormLabel,
  NicknameInputWrapper,
  RelationGrid,
  RelationOption,
  AcceptButtonWrapper,
  FooterTip,
} from "./styles";
// 导入工具函数
import { vw } from "@/utils";

// ===== 以下为模拟数据，仅用于静态页面预览 =====
// 后续接入业务时由 GET /invite/info?token=xxx 接口返回
const MOCK_INVITE = {
  inviterName: "汀汀妈妈",
  inviterAvatar: "",
  babyName: "汀汀",
  babyAvatar: "",
  babyAge: "8 个月",
  familyCount: 2,
  expiresAt: "2026-10-07",
};

// 与宝宝关系选项（与后端 relation 枚举对应：father/mother/grandparent/other）
const RELATION_OPTIONS = [
  { value: "father", label: "爸爸" },
  { value: "mother", label: "妈妈" },
  { value: "grandparent", label: "爷爷奶奶" },
  { value: "other", label: "其他亲友" },
];

export default function Invite() {
  // 我的昵称
  const [nickname, setNickname] = useState("");
  // 选择的与宝宝关系
  const [relation, setRelation] = useState("");

  return (
    <InviteContainer>
      {/* 顶部邀请信息 */}
      <HeaderSection>
        <InviterAvatar>
          {MOCK_INVITE.inviterAvatar ? (
            <InviterAvatarImg
              src={MOCK_INVITE.inviterAvatar}
              alt={MOCK_INVITE.inviterName}
            />
          ) : (
            <AiOutlineUser color="#fff" size={vw(32)} />
          )}
        </InviterAvatar>
        <InviteTitle>{MOCK_INVITE.inviterName} 邀请你加入</InviteTitle>
        <InviteSubtitle>一起见证宝宝的成长点滴</InviteSubtitle>
      </HeaderSection>

      {/* 宝宝信息卡片 */}
      <BabyCard>
        <BabyAvatar>
          {MOCK_INVITE.babyAvatar ? (
            <InviterAvatarImg
              src={MOCK_INVITE.babyAvatar}
              alt={MOCK_INVITE.babyName}
            />
          ) : (
            <PiBabyLight color="#ff6b8a" size={vw(40)} />
          )}
        </BabyAvatar>
        <BabyName>{MOCK_INVITE.babyName}</BabyName>
        <BabyAge>{MOCK_INVITE.babyAge}的小可爱</BabyAge>
        <FamilyPreview>
          已有 {MOCK_INVITE.familyCount} 位家人关注中
        </FamilyPreview>
      </BabyCard>

      {/* 信息填写卡片 */}
      <FormCard>
        {/* 我的昵称 */}
        <FormLabel>我的昵称</FormLabel>
        <NicknameInputWrapper>
          <Input
            placeholder="请输入你的昵称"
            value={nickname}
            onChange={(val: string) => setNickname(val)}
            clearable
          />
        </NicknameInputWrapper>

        {/* 与宝宝的关系 */}
        <FormLabel>我是宝宝的…</FormLabel>
        <RelationGrid>
          {RELATION_OPTIONS.map((option) => (
            <RelationOption
              key={option.value}
              className={relation === option.value ? "active" : ""}
              onClick={() => setRelation(option.value)}
            >
              {option.label}
            </RelationOption>
          ))}
        </RelationGrid>
      </FormCard>

      {/* 接受邀请按钮 */}
      <AcceptButtonWrapper>
        <Button type="primary" shape="round" block className="accept-button">
          接受邀请，加入成长圈
        </Button>
      </AcceptButtonWrapper>

      {/* 底部提示 */}
      <FooterTip>邀请链接将于 {MOCK_INVITE.expiresAt} 过期</FooterTip>
    </InviteContainer>
  );
}
