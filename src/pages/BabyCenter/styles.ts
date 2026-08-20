// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 宝宝个人中心容器 */
export const BabyCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(16)};
`;

/* ========== 宝宝信息横幅（与 TimeLine babyInfo 风格一致） ========== */
export const BabyBanner = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(16)};
  padding: ${vw(28)} ${vw(20)};
  border-radius: ${vw(20)};
  background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.3);
`;

export const BabyAvatar = styled.div`
  width: ${vw(64)};
  height: ${vw(64)};
  border-radius: 50%;
  background: #fff;
  border: ${vw(2)} solid rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const BabyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(6)};
  flex: 1;
`;

export const BabyNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(6)};
`;

export const BabyName = styled.span`
  font-size: ${vw(20)};
  font-weight: 700;
  color: #fff;
`;

export const BabyDesc = styled.span`
  font-size: ${vw(12)};
  color: rgba(255, 255, 255, 0.85);
`;

/* ========== 亲友邀请区域 ========== */
export const InviteCard = styled.div`
  background: #fff;
  border-radius: ${vw(20)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
  padding: ${vw(20)};
`;

export const InviteHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${vw(16)};
`;

export const InviteTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(6)};
  font-size: ${vw(15)};
  font-weight: 600;
  color: #2d2d2d;
`;

export const InviteInfo = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${vw(16)};
  height: ${vw(16)};
  border-radius: 50%;
  background: #fff0f3;
  color: #ff6b8a;
  font-size: ${vw(11)};
  cursor: pointer;
`;

export const InviteList = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${vw(16)};
  overflow-x: auto;
  padding-bottom: ${vw(4)};

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const InviteItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(6)};
  flex-shrink: 0;
  width: ${vw(60)};
`;

export const InviteAvatar = styled.div`
  width: ${vw(48)};
  height: ${vw(48)};
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd3dd 0%, #ffe3ec 100%);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InviteName = styled.span`
  font-size: ${vw(13)};
  color: #2d2d2d;
`;

export const InviteVisit = styled.span`
  font-size: ${vw(11)};
  color: #999;
`;

export const InviteAddBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(6)};
  flex-shrink: 0;
  width: ${vw(60)};
  cursor: pointer;
`;

export const InviteAddIcon = styled.div`
  width: ${vw(48)};
  height: ${vw(48)};
  border-radius: 50%;
  border: ${vw(2)} dashed #ff9eb5;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff6b8a;
  background: #fff0f3;
`;

export const InviteAddText = styled.span`
  font-size: ${vw(13)};
  color: #ff6b8a;
`;

/* ========== 功能菜单网格 ========== */
export const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${vw(16)};
  background: #fff;
  border-radius: ${vw(20)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
  padding: ${vw(20)} ${vw(12)};
`;

export const MenuGridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(8)};
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
`;

export const MenuIconWrap = styled.div<{ $bg: string }>`
  width: ${vw(44)};
  height: ${vw(44)};
  border-radius: ${vw(12)};
  background: ${(props) => props.$bg};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MenuLabel = styled.span`
  font-size: ${vw(12)};
  color: #2d2d2d;
`;

/* ========== 宝宝档案卡片 ========== */
export const ArchiveCard = styled.div`
  background: #fff;
  border-radius: ${vw(20)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
  overflow: hidden;
`;
