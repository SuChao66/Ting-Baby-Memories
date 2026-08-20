import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入背景图
import babyBg from "@/assets/images/baby-bg.png";

/** 宝宝信息横幅 */
export const ProfileBanner = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(16)};
  padding: ${vw(36)} ${vw(20)};
  border-radius: ${vw(12)};
  background-image: url(${babyBg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.3);
  position: relative;
`;

/** 横幅头像 */
export const BannerAvatar = styled.div`
  width: ${vw(60)};
  height: ${vw(60)};
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

/** 横幅文本区域 */
export const BannerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(6)};
  flex: 1;
`;

/** 横幅昵称行 */
export const BannerNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(6)};
`;

/** 横幅昵称 */
export const BannerName = styled.span`
  font-size: ${vw(20)};
  font-weight: 700;
  color: #fff;
`;

/** 横幅生日 */
export const BannerBirthday = styled.span`
  font-size: ${vw(12)};
  color: rgba(255, 255, 255, 0.85);
`;

/** 横幅统计 */
export const BannerStats = styled.div`
  display: flex;
`;

/** 统计数值 */
export const StatValue = styled.span`
  font-size: ${vw(14)};
  color: #fff;
`;

/** 宝宝个人中心 */
export const BabyCenter = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  font-size: ${vw(12)};
  color: #fff;
  padding: ${vw(6)} ${vw(12)};
  border-radius: ${vw(80)} 0 0 ${vw(80)};
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  gap: ${vw(4)};
`;
