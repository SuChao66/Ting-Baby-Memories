// 导入图标
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";
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
  InviteAddBtn,
  InviteAddIcon,
  InviteAddText,
} from "./style";
// 导入工具函数
import { vw } from "@/utils";

// 亲友数据
const relatives = [
  { id: 1, name: "爸爸", visitCount: 37, lastVisit: "刚刚", avatar: "" },
  { id: 2, name: "妈妈", visitCount: 5, lastVisit: "8-4 09:58", avatar: "" },
];

function InviteCard() {
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
        {relatives.map((item) => (
          <InviteItem key={item.id}>
            <InviteAvatar>
              {item.avatar ? (
                <img src={item.avatar} alt={item.name} />
              ) : (
                <span style={{ fontSize: vw(18), color: "#ff6b8a" }}>
                  {item.name.charAt(0)}
                </span>
              )}
            </InviteAvatar>
            <InviteName>{item.name}</InviteName>
            <InviteVisit>
              来过{item.visitCount}次 · {item.lastVisit}
            </InviteVisit>
          </InviteItem>
        ))}
        <InviteAddBtn>
          <InviteAddIcon>
            <HiOutlinePlus size={vw(24)} />
          </InviteAddIcon>
          <InviteAddText>邀请亲友</InviteAddText>
        </InviteAddBtn>
      </InviteList>
    </InviteContainer>
  );
}

export default InviteCard;
