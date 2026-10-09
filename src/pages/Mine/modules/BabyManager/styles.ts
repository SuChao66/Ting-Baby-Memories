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

/** 弹层选项列表 */
export const ActionList = styled.div`
  padding: ${vw(8)} ${vw(20)} 0;
`;

/** 弹层选项项 */
export const ActionItem = styled.div<{ $isLast?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${vw(12)};
  padding: ${vw(16)} 0;
  border-bottom: ${(props) => (props.$isLast ? "none" : "1px solid #f5f5f5")};
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;

/** 选项图标 */
export const ActionIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${vw(40)};
  height: ${vw(40)};
  border-radius: ${vw(12)};
  background: #fff0f3;
  flex-shrink: 0;
`;

/** 选项文字区域 */
export const ActionText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${vw(4)};
  min-width: 0;
`;

/** 选项标题 */
export const ActionTitle = styled.span`
  font-size: ${vw(15)};
  color: #2d2d2d;
`;

/** 选项描述 */
export const ActionDesc = styled.span`
  font-size: ${vw(12)};
  color: #999;
`;

/** 选项右箭头 */
export const RowArrowWrap = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

/** 弹层取消按钮 */
export const CancelButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${vw(16)} 0;
  padding-bottom: calc(${vw(16)} + constant(safe-area-inset-bottom));
  padding-bottom: calc(${vw(16)} + env(safe-area-inset-bottom));
  font-size: ${vw(14)};
  color: #999;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;
