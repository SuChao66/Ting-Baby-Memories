import { useNavigate } from "react-router-dom";
// 导入图标
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入页面样式组件
import { BabyContainer, AddBabyCard } from "./styles";
// 导入宝宝列表组件
import BabyList from "./modules/BabyLIst";
// 导入导航栏组件
import NavHeader from "@/components/navHeader";

function BabyManager() {
  const navigate = useNavigate();

  return (
    <BabyContainer>
      <NavHeader title="宝宝管理" back={<IoIosArrowBack size={22} />} />
      {/* 宝宝列表卡片 */}
      <BabyList />
      {/* 添加宝宝 */}
      <AddBabyCard onClick={() => navigate("/add-baby")}>
        <AiOutlinePlus size={vw(16)} />
        添加宝宝
      </AddBabyCard>
    </BabyContainer>
  );
}

export default BabyManager;
