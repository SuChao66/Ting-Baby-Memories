import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoFemale } from "react-icons/io5";
// 导入 React Icons 图标
import {
  AiOutlineRight,
  AiOutlineInfoCircle,
  AiOutlineCloud,
  AiOutlineFlag,
  AiOutlineHome,
  AiOutlineStock,
  AiOutlineMedicineBox,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineSolution,
  AiOutlineUser,
} from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入组件
import NavHeader from "@/components/navHeader";
// 导入通用样式组件
import { CardRow, RowArrow } from "@/styles/common";
// 导入样式组件
import {
  BabyCenterContainer,
  BabyBanner,
  BabyAvatar,
  BabyInfo,
  BabyNameRow,
  BabyName,
  BabyDesc,
  InviteCard,
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
  MenuGrid,
  MenuGridItem,
  MenuIconWrap,
  MenuLabel,
  ArchiveCard,
} from "./styles";

// 亲友数据
const relatives = [
  { id: 1, name: "爸爸", visitCount: 37, lastVisit: "刚刚", avatar: "" },
  { id: 2, name: "妈妈", visitCount: 5, lastVisit: "8-4 09:58", avatar: "" },
];

// 功能菜单数据
const menuList = [
  {
    key: "cloudAlbum",
    label: "云相册",
    icon: <AiOutlineCloud color="#4fc3f7" size={vw(22)} />,
    bg: "#e3f2fd",
  },
  {
    key: "milestone",
    label: "大事记",
    icon: <AiOutlineFlag color="#f06292" size={vw(22)} />,
    bg: "#fce4ec",
  },
  {
    key: "dailyRecord",
    label: "吃喝拉撒睡",
    icon: <AiOutlineHome color="#ff8a80" size={vw(22)} />,
    bg: "#ffebee",
  },
  {
    key: "heightWeight",
    label: "身高体重",
    icon: <AiOutlineStock color="#ff9e53" size={vw(22)} />,
    bg: "#fff3e0",
  },
  {
    key: "vaccine",
    label: "疫苗接种",
    icon: <AiOutlineMedicineBox color="#4fc3f7" size={vw(22)} />,
    bg: "#e3f2fd",
  },
  {
    key: "symptom",
    label: "症状护理",
    icon: <AiOutlineHeart color="#81d4fa" size={vw(22)} />,
    bg: "#e1f5fe",
  },
  {
    key: "teeth",
    label: "长牙换牙",
    icon: <AiOutlineHeart color="#ffcc5c" size={vw(22)} />,
    bg: "#fffde7",
  },
  {
    key: "futureMessage",
    label: "未来寄语",
    icon: <AiOutlineMessage color="#ba68c8" size={vw(22)} />,
    bg: "#f3e5f5",
  },
];

function BabyCenter() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 跳转至宝宝档案
  const handleToBabyFile = () => {
    navigate(`/baby-file/${id}`);
  };

  return (
    <>
      <NavHeader title="宝宝个人中心" back={<IoIosArrowBack size={22} />} />
      <BabyCenterContainer>
        {/* 宝宝信息横幅 */}
        <BabyBanner>
          <BabyAvatar>
            <AiOutlineUser color="#ff6b8a" size={vw(32)} />
          </BabyAvatar>
          <BabyInfo>
            <BabyNameRow>
              <BabyName>汀宝宝</BabyName>
              <IoFemale color="#fff" size={vw(16)} />
            </BabyNameRow>
            <BabyDesc>出生：2024年1月15日 · 1岁7个月</BabyDesc>
          </BabyInfo>
        </BabyBanner>

        {/* 亲友邀请区域 */}
        <InviteCard>
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
        </InviteCard>

        {/* 功能菜单网格 */}
        <MenuGrid>
          {menuList.map((item) => (
            <MenuGridItem key={item.key}>
              <MenuIconWrap $bg={item.bg}>{item.icon}</MenuIconWrap>
              <MenuLabel>{item.label}</MenuLabel>
            </MenuGridItem>
          ))}
        </MenuGrid>

        {/* 宝宝档案卡片 */}
        <ArchiveCard>
          <CardRow onClick={handleToBabyFile}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: vw(12),
                flex: 1,
              }}
            >
              <AiOutlineSolution color="#ff6b8a" size={vw(18)} />
              <span style={{ fontSize: vw(15), color: "#2d2d2d" }}>
                宝宝档案
              </span>
            </span>
            <RowArrow>
              <AiOutlineRight size={vw(14)} />
            </RowArrow>
          </CardRow>
        </ArchiveCard>
      </BabyCenterContainer>
    </>
  );
}

export default BabyCenter;
