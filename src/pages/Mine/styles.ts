// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 我的页面容器 */
export const MineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(16)};
`;

/** 用户信息横幅 */
export const ProfileBanner = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(16)};
  padding: ${vw(28)} ${vw(20)};
  border-radius: ${vw(20)};
  background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.3);
`;

/** 横幅头像 */
export const BannerAvatar = styled.div`
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

/** 横幅文本区域 */
export const BannerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(6)};
`;

/** 横幅昵称 */
export const BannerName = styled.span`
  font-size: ${vw(20)};
  font-weight: 700;
  color: #fff;
`;

/** 横幅简介 */
export const BannerDesc = styled.span`
  font-size: ${vw(12)};
  color: rgba(255, 255, 255, 0.85);
`;

/** 退出登录按钮 */
export const LogoutButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${vw(6)};
  height: ${vw(48)};
  border-radius: ${vw(24)};
  background: #fff;
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
  font-size: ${vw(16)};
  color: #ff6b8a;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;
