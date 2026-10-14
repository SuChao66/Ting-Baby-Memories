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
import { useFamilyStore, useUserStore } from "@/store";
// 导入常量
import { USER_AND_BABY_RELATION } from "@/enums";

function InviteCard(props: { id: string }) {
  const { id } = props;

  // 获取家庭列表
  const { familyList, getFamilyList } = useFamilyStore((state) => state);
  const { userInfo, getRelationOfBaby } = useUserStore((state) => state);

  // 邀请亲友弹层显示状态
  const [inviteVisible, setInviteVisible] = useState(false);
  const [relation, setRelation] = useState<any>(null);

  useEffect(() => {
    getFamilyList(id);
  }, []);

  useEffect(() => {
    getRelationOfBaby(id).then((relation) => {
      setRelation(relation);
    });
  }, [userInfo?._id]);

  return (
    <InviteContainer>
      <InviteHeader>
        <InviteTitle>{familyList.length}位亲友可见</InviteTitle>
      </InviteHeader>
      <InviteList>
        {familyList.map((item) => (
          <InviteItem key={item._id}>
            <InviteAvatar>
              {item.userId.avatarUrl !== null ? (
                <img src={item.userId.avatarUrl} alt={item.nickname} />
              ) : (
                <span style={{ fontSize: vw(18), color: "#ff6b8a" }}>
                  {item.userId.nickname}
                </span>
              )}
            </InviteAvatar>
            <InviteName>{item.userId.nickname}</InviteName>
            <InviteVisit>来过{item.visitCount}次</InviteVisit>
          </InviteItem>
        ))}
        {relation !== USER_AND_BABY_RELATION.OTHER && (
          <InviteAddBtn onClick={() => setInviteVisible(true)}>
            <InviteAddIcon>
              <HiOutlinePlus size={vw(24)} />
            </InviteAddIcon>
            <InviteAddText>邀请亲友</InviteAddText>
          </InviteAddBtn>
        )}
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
