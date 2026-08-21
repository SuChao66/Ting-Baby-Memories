import { useNavigate } from "react-router-dom";
import {
  MenuGridContainer,
  MenuGridItem,
  MenuIconWrap,
  MenuLabel,
} from "./styles";
// 导入图片
import {
  AiOutlineCloud,
  AiOutlineFlag,
  AiOutlineHome,
  AiOutlineStock,
  AiOutlineMedicineBox,
  AiOutlineHeart,
  AiOutlineMessage,
} from "react-icons/ai";
// 导入工具函数
import { vw } from "@/utils";

// 功能菜单数据
const menuList = [
  {
    key: "cloudAlbum",
    label: "云相册",
    icon: <AiOutlineCloud color="#4fc3f7" size={vw(22)} />,
    bg: "#e3f2fd",
    path: "/cloud-album",
  },
  {
    key: "milestone",
    label: "大事记",
    icon: <AiOutlineFlag color="#f06292" size={vw(22)} />,
    bg: "#fce4ec",
    path: "/mile-stone",
  },
  {
    key: "dailyRecord",
    label: "吃喝拉撒睡",
    icon: <AiOutlineHome color="#ff8a80" size={vw(22)} />,
    bg: "#ffebee",
    path: "/daily-record",
  },
  {
    key: "heightWeight",
    label: "身高体重",
    icon: <AiOutlineStock color="#ff9e53" size={vw(22)} />,
    bg: "#fff3e0",
    path: "/height-weight",
  },
  {
    key: "vaccine",
    label: "疫苗接种",
    icon: <AiOutlineMedicineBox color="#4fc3f7" size={vw(22)} />,
    bg: "#e3f2fd",
    path: "/vaccine",
  },
  {
    key: "symptom",
    label: "症状护理",
    icon: <AiOutlineHeart color="#81d4fa" size={vw(22)} />,
    bg: "#e1f5fe",
    path: "/symptom",
  },
  {
    key: "teeth",
    label: "长牙换牙",
    icon: <AiOutlineHeart color="#ffcc5c" size={vw(22)} />,
    bg: "#fffde7",
    path: "/teeth",
  },
  {
    key: "futureMessage",
    label: "未来寄语",
    icon: <AiOutlineMessage color="#ba68c8" size={vw(22)} />,
    bg: "#f3e5f5",
    path: "/future-message",
  },
];

function MenuCard(props: { id: string }) {
  const { id } = props;
  const navigate = useNavigate();

  // 跳转到对应的路由
  const jumpTo = (path: string) => {
    navigate(`${path}/${id}`);
  };

  return (
    <MenuGridContainer>
      {menuList.map((item) => (
        <MenuGridItem key={item.key} onClick={() => jumpTo(item.path)}>
          <MenuIconWrap $bg={item.bg}>{item.icon}</MenuIconWrap>
          <MenuLabel>{item.label}</MenuLabel>
        </MenuGridItem>
      ))}
    </MenuGridContainer>
  );
}

export default MenuCard;
