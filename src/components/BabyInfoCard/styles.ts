import styled from "styled-components";
import { vw } from "@/utils";

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
