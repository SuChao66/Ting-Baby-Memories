import { useNavigate, useParams } from "react-router-dom";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineRight, AiOutlineSolution } from "react-icons/ai";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入组件
import NavHeader from "@/components/navHeader";
import BabyInfoCard from "@/components/BabyInfoCard";
import InviteCard from "./components/InviteCard";
import MenuCard from "./components/MenuGrid";
// 导入通用样式组件
import { CardRow, RowArrow } from "@/styles/common";
// 导入样式组件
import { BabyCenterContainer, ArchiveCard } from "./styles";

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
        <BabyInfoCard id={id!} />
        {/* 亲友邀请区域 */}
        <InviteCard id={id!} />
        {/* 功能菜单网格 */}
        <MenuCard id={id!} />
        {/* 宝宝档案卡片 */}
        <ArchiveCard>
          <CardRow onClick={handleToBabyFile}>
            <span className="file">
              <AiOutlineSolution color="#ff6b8a" size={vw(18)} />
              <span className="name">宝宝档案</span>
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
