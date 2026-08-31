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
  height: 100%;
`;

/** 左滑容器 */
export const SwipeItem = styled.div`
  display: flex;
  gap: ${vw(12)};
  align-items: center;
  background-color: #fff;
  padding: ${vw(12)} ${vw(18)};
  box-sizing: border-box;
  position: relative;
  width: 100%;
  border-radius: ${vw(12)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
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
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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

/** 成长记录 */
export const BabyRecords = styled.span`
  font-size: ${vw(14)};
  color: #00000073;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
