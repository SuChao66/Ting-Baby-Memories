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

/* ========== 宝宝档案卡片 ========== */
export const ArchiveCard = styled.div`
  background: #fff;
  border-radius: ${vw(20)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
  overflow: hidden;
  .file {
    display: flex;
    align-items: center;
    gap: ${vw(12)};
    flex: 1;
  }
  .name {
    font-size: ${vw(15)};
    color: #2d2d2d;
  }
`;
