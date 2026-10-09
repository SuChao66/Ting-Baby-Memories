import { useEffect, useState } from "react";
// 导入图标
import { HiOutlinePlus } from "react-icons/hi";
// 导入样式
import {
  InviteContainer,
  InviteHeader,
  InviteTitle,
  InviteList,
  InviteItem,
  InviteAvatar,
  InviteName,
  InviteVisit,
  InviteAddBtn,
  InviteAddIcon,
  InviteAddText,
} from "./style";
// 导入组件
import InviteModal from "../InviteModal";
// 导入工具函数
import { vw } from "@/utils";
// 导入状态管理
import { useFamilyStore } from "@/store";

function InviteCard(props: { id: string }) {
  const { id } = props;

  // 获取家庭列表
  const { familyList, getFamilyList } = useFamilyStore((state) => state);

  // 邀请亲友弹层显示状态
  const [inviteVisible, setInviteVisible] = useState(false);

  useEffect(() => {
    getFamilyList(id);
  }, []);

  return (
    <InviteContainer>
      <InviteHeader>
        <InviteTitle>{familyList.length}位亲友可见</InviteTitle>
      </InviteHeader>
      <InviteList>
        {familyList.map((item) => (
          <InviteItem key={item._id}>
            <InviteAvatar>
              {item.userId.avatarUrl ? (
                <img src={item.userId.avatarUrl} alt={item.nickname} />
              ) : (
                <span style={{ fontSize: vw(18), color: "#ff6b8a" }}>
                  {item.nickname}
                </span>
              )}
            </InviteAvatar>
            <InviteName>{item.nickname}</InviteName>
            <InviteVisit>来过{item.visitCount}次</InviteVisit>
          </InviteItem>
        ))}
        <InviteAddBtn onClick={() => setInviteVisible(true)}>
          <InviteAddIcon>
            <HiOutlinePlus size={vw(24)} />
          </InviteAddIcon>
          <InviteAddText>邀请亲友</InviteAddText>
        </InviteAddBtn>
      </InviteList>

      {/* 邀请亲友弹层 */}
      <InviteModal
        visible={inviteVisible}
        babyId={id}
        onClose={() => setInviteVisible(false)}
      />
    </InviteContainer>
  );
}

export default InviteCard;
