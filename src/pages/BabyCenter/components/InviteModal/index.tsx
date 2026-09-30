// 导入 React hooks
import { useState } from "react";
// 导入图标
import { AiOutlineClose } from "react-icons/ai";
// 导入样式组件
import {
  ModalHeader,
  ModalTitle,
  CloseBtn,
  ModalBody,
  SectionLabel,
  RelationGrid,
  RelationOption,
  ExpireRow,
  ExpireOption,
  LinkBox,
  LinkText,
  CopyBtn,
  ModalTip,
  GenerateButtonWrapper,
} from "./styles";
// 导入 vw 工具函数
import { vw, copyToClipboard } from "@/utils";
// 导入常量
import { RELATION_OPTIONS, EXPIRE_OPTIONS } from "@/enums";
// 导入store
import { useBabyInviteStore } from "@/store";
// 导入类型
import type { IInviteLinkParams } from "@/interface/inviteRecord";

interface IProps {
  /** babyId */
  babyId: string;
  /** 弹层显示状态 */
  visible: boolean;
  /** 关闭弹层 */
  onClose: () => void;
}

function InviteModal(props: IProps) {
  const { visible, babyId, onClose } = props;

  const { generateInviteLink } = useBabyInviteStore((state) => state);

  // 选择的关系（被邀请人与宝宝的关系）
  const [relation, setRelation] = useState("grandparent");
  // 选择的邀请有效期（天）
  const [expireDays, setExpireDays] = useState(7);
  // 链接地址
  const [inviteURL, setInviteURL] = useState("");
  // 当前页面地址
  const domain = location.origin + location.pathname;

  // 生成链接
  const handleGenerateLink = async () => {
    const params: IInviteLinkParams = {
      babyId,
      relation,
      expireDays,
    };
    const data = await generateInviteLink(params);
    if (data) {
      // 接口返回 token 字符串，拼接到邀请页路由
      setInviteURL(`${domain}#/invite/${data}`);
    }
  };

  // 复制地址
  const handleCopyUrl = async () => {
    const ok = await copyToClipboard(inviteURL);
    if (ok) {
      Toast.show({
        title: "链接已复制到剪贴板",
        icon: "success",
      });
    }
  };

  return (
    <Popup visible={visible} position="bottom" round onClose={onClose}>
      {/* 弹层头部：标题 + 关闭按钮 */}
      <ModalHeader>
        <ModalTitle>邀请亲友</ModalTitle>
        <CloseBtn onClick={onClose}>
          <AiOutlineClose size={vw(16)} color="#999" />
        </CloseBtn>
      </ModalHeader>

      <ModalBody>
        {/* 关系选择 */}
        <SectionLabel>TA 是宝宝的…</SectionLabel>
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

        {/* 有效期选择 */}
        <SectionLabel>链接有效期</SectionLabel>
        <ExpireRow>
          {EXPIRE_OPTIONS.map((option) => (
            <ExpireOption
              key={option.value}
              className={expireDays === option.value ? "active" : ""}
              onClick={() => setExpireDays(option.value)}
            >
              {option.label}
            </ExpireOption>
          ))}
        </ExpireRow>

        {/* 邀请链接预览 */}
        <SectionLabel>邀请链接</SectionLabel>
        <LinkBox>
          <LinkText>
            {inviteURL ? inviteURL : "请点击下方按钮生成邀请链接"}
          </LinkText>
          {inviteURL && <CopyBtn onClick={handleCopyUrl}>复制</CopyBtn>}
        </LinkBox>

        {/* 说明 */}
        <ModalTip>
          将链接分享给亲友，TA
          打开链接并确认后即可加入宝宝成长圈；每条链接仅限一位亲友使用，多位亲友请分别生成
        </ModalTip>

        {/* 生成按钮 */}
        <GenerateButtonWrapper>
          <Button
            type="primary"
            shape="round"
            block
            className="invite-generate-btn"
            onClick={handleGenerateLink}
          >
            生成邀请链接
          </Button>
        </GenerateButtonWrapper>
      </ModalBody>
    </Popup>
  );
}

export default InviteModal;
