import { useEffect } from "react";
// 导入图标
import { AiOutlineInfoCircle } from "react-icons/ai";
// import { HiOutlinePlus } from "react-icons/hi";
// 导入样式
import {
  InviteContainer,
  InviteHeader,
  InviteTitle,
  InviteInfo,
  InviteList,
  InviteItem,
  InviteAvatar,
  InviteName,
  InviteVisit,
  // InviteAddBtn,
  // InviteAddIcon,
  // InviteAddText,
} from "./style";
// 导入工具函数
import { vw } from "@/utils";
// 导入状态管理
import { useFamilyStore } from "@/store";

function InviteCard(props: { id: string }) {
  const { id } = props;

  const { familyList, getFamilyList } = useFamilyStore((state) => state);

  useEffect(() => {
    getFamilyList(id);
  }, []);

  return (
    <InviteContainer>
      <InviteHeader>
        <InviteTitle>
          2位亲友可见
          <InviteInfo>
            <AiOutlineInfoCircle size={vw(12)} />
          </InviteInfo>
        </InviteTitle>
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
        {/* <InviteAddBtn>
          <InviteAddIcon>
            <HiOutlinePlus size={vw(24)} />
          </InviteAddIcon>
          <InviteAddText>邀请亲友</InviteAddText>
        </InviteAddBtn> */}
      </InviteList>
    </InviteContainer>
  );
}

export default InviteCard;
