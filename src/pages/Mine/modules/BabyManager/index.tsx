import { useNavigate } from "react-router-dom";
// 导入 React hooks
import { useState } from "react";
// 导入图标
import { AiOutlinePlus, AiOutlineLink, AiOutlineRight } from "react-icons/ai";
import { PiBabyLight } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入页面样式组件
import {
  BabyContainer,
  AddBabyCard,
  ActionList,
  ActionItem,
  ActionIcon,
  ActionText,
  ActionTitle,
  ActionDesc,
  RowArrowWrap,
  CancelButton,
} from "./styles";
// 导入宝宝列表组件
import BabyList from "./components/BabyLIst";
// 导入导航栏组件
import NavHeader from "@/components/navHeader";

function BabyManager() {
  const navigate = useNavigate();
  // 添加方式选择弹层可见性
  const [popupVisible, setPopupVisible] = useState(false);

  // 新建宝宝
  const handleCreate = () => {
    setPopupVisible(false);
    navigate("/add-baby");
  };

  // 关联已有宝宝
  const handleBind = () => {
    setPopupVisible(false);
    navigate("/bind-baby");
  };

  return (
    <BabyContainer>
      <NavHeader title="宝宝管理" back={<IoIosArrowBack size={22} />} />
      {/* 宝宝列表卡片 */}
      <BabyList />
      {/* 添加宝宝 */}
      <AddBabyCard onClick={() => setPopupVisible(true)}>
        <AiOutlinePlus size={vw(16)} />
        添加宝宝
      </AddBabyCard>

      {/* 添加方式选择弹层 */}
      <Popup
        visible={popupVisible}
        position="bottom"
        round
        onClose={() => setPopupVisible(false)}
      >
        <ActionList>
          {/* 新建宝宝 */}
          <ActionItem onClick={handleCreate}>
            <ActionIcon>
              <PiBabyLight color="#ff6b8a" size={vw(20)} />
            </ActionIcon>
            <ActionText>
              <ActionTitle>新建宝宝</ActionTitle>
              <ActionDesc>为宝宝创建全新的成长档案</ActionDesc>
            </ActionText>
            <RowArrowWrap>
              <AiOutlineRight color="#ccc" size={vw(14)} />
            </RowArrowWrap>
          </ActionItem>
          {/* 关联已有宝宝 */}
          <ActionItem $isLast onClick={handleBind}>
            <ActionIcon>
              <AiOutlineLink color="#ff6b8a" size={vw(20)} />
            </ActionIcon>
            <ActionText>
              <ActionTitle>关联已有宝宝</ActionTitle>
              <ActionDesc>通过宝宝号与家人共同记录</ActionDesc>
            </ActionText>
            <RowArrowWrap>
              <AiOutlineRight color="#ccc" size={vw(14)} />
            </RowArrowWrap>
          </ActionItem>
        </ActionList>
        {/* 取消 */}
        <CancelButton onClick={() => setPopupVisible(false)}>取消</CancelButton>
      </Popup>
    </BabyContainer>
  );
}

export default BabyManager;
