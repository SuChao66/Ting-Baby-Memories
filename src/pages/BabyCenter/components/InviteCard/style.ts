import styled from "styled-components";
import { vw } from "@/utils";

/* ========== 亲友邀请区域 ========== */
export const InviteContainer = styled.div`
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
