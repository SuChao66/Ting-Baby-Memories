// 导入 React hooks
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// 导入图标
import { AiOutlineUser } from "react-icons/ai";
// 导入样式组件
import {
  InviteContainer,
  HeaderSection,
  InviterAvatar,
  InviterAvatarImg,
  InviteTitle,
  InviteSubtitle,
  FormCard,
  FormLabel,
  NicknameInputWrapper,
  RelationGrid,
  RelationOption,
  AcceptButtonWrapper,
  FooterTip,
} from "./styles";
// 导入工具函数
import { vw, formatDateTime } from "@/utils";
// 导入store
import { useBabyInviteStore } from "@/store";
// 导入常量
import { RELATION_OPTIONS } from "@/enums";
// 导入类型
import type { IInviteLinkPreviewInfo } from "@/interface/babyInvite";

export default function Invite() {
  const { token } = useParams();
  // 引入 store
  const { getInviteLinkInfo } = useBabyInviteStore((state) => state);

  const [previewInfo, setPreviewInfo] = useState<IInviteLinkPreviewInfo>({
    inviterAvatarUrl: "",
    babyNickname: "",
    relation: "",
    expiresAt: "",
  });
  // 我的昵称
  const [nickname, setNickname] = useState("");
  // 选择的与宝宝关系
  const [relation, setRelation] = useState("");
  // 链接是否已失效（过期/已被使用/已作废）
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    // 路由上没有 token：直接视为失效链接
    if (!token) {
      setInvalid(true);
      return;
    }
    getInviteLinkInfo(token).then((data) => {
      // 链接已失效或查询失败：切换失效态，避免空数据渲染崩溃
      if (!data) {
        setInvalid(true);
        return;
      }
      setPreviewInfo(data);
    });
  }, [token]);

  return (
    <InviteContainer>
      {invalid ? (
        <HeaderSection>
          <InviteTitle>邀请链接已失效</InviteTitle>
          <InviteSubtitle>请联系邀请人重新发送邀请链接</InviteSubtitle>
        </HeaderSection>
      ) : (
        <>
          {/* 顶部邀请信息 */}
          <HeaderSection>
            <InviterAvatar>
              {previewInfo.inviterAvatarUrl ? (
                <InviterAvatarImg src={previewInfo.inviterAvatarUrl} />
              ) : (
                <AiOutlineUser color="#fff" size={vw(32)} />
              )}
            </InviterAvatar>
            <InviteTitle>
              【{previewInfo.babyNickname}
              {
                RELATION_OPTIONS.find(
                  (item) => item.value === previewInfo.relation,
                )?.name
              }
              】邀请你加入
            </InviteTitle>
            <InviteSubtitle>一起见证宝宝的成长点滴</InviteSubtitle>
          </HeaderSection>

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
                  {option.name}
                </RelationOption>
              ))}
            </RelationGrid>
          </FormCard>

          {/* 接受邀请按钮 */}
          <AcceptButtonWrapper>
            <Button
              type="primary"
              shape="round"
              block
              className="accept-button"
            >
              接受邀请，加入成长圈
            </Button>
          </AcceptButtonWrapper>

          {/* 底部提示（数据返回后再渲染，避免 Invalid Date 闪现） */}
          {previewInfo.expiresAt && (
            <FooterTip>
              邀请链接将于{" "}
              {formatDateTime(new Date(previewInfo.expiresAt))} 过期
            </FooterTip>
          )}
        </>
      )}
    </InviteContainer>
  );
}
