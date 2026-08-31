// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 宝宝管理页面容器 */
export const BabyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${vw(16)};

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/** 添加宝宝卡片 */
export const AddBabyCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${vw(8)};
  padding: ${vw(16)} ${vw(16)};
  box-sizing: border-box;
  border-radius: ${vw(80)};
  background: #fff;
  border: ${vw(1)} dashed #ffc0d0;
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
  font-size: ${vw(14)};
  color: #ff6b8a;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;
