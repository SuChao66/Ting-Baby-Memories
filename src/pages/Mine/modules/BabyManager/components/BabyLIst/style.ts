import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 宝宝管理页面列表页 */
export const BabyListContainer = styled.div`
  flex: 1;
  overflow: auto;
`;

export const BabyItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(12)};
`;

/** 左滑容器 */
export const SwipeItem = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: ${vw(12)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
`;

/** 左滑内容区 */
export const SwipeContent = styled.div<{ $offset: number }>`
  display: flex;
  align-items: center;
  gap: ${vw(12)};
  min-height: ${vw(52)};
  width: 100%;
  box-sizing: border-box;
  padding: ${vw(10)} ${vw(20)};
  background: #fff;
  transform: translateX(${(props) => vw(props.$offset)});
  transition: ${(props) =>
    props.$offset === 0 || props.$offset === -80
      ? "transform 0.3s ease"
      : "none"};
  touch-action: pan-y;
  position: relative;
  z-index: 1;
`;

/** 删除按钮 */
export const DeleteButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${vw(80)};
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff4d4f;
  color: #fff;
  font-size: ${vw(15)};
  font-weight: 600;
`;

/** 宝宝头像 */
export const BabyAvatar = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${vw(48)};
  height: ${vw(48)};
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd3dd 0%, #ffe3ec 100%);
  overflow: hidden;
  flex-shrink: 0;
`;

/** 宝宝信息区域 */
export const BabyInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(4)};
  flex: 1;
  overflow: hidden;
`;

/** 宝宝姓名 */
export const BabyName = styled.span`
  font-size: ${vw(16)};
  font-weight: 600;
  color: #000000e0;
  display: flex;
  align-items: center;
  gap: ${vw(4)};
`;

/** 宝宝生日 */
export const BabyBirthday = styled.span`
  font-size: ${vw(14)};
  color: #00000073;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/** 宝宝号 */
export const BabyNo = styled.span`
  font-size: ${vw(14)};
  color: #00000073;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
