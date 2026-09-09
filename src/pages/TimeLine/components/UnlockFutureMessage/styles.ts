import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 弹层头部：标题 + 总数 + 关闭按钮 */
export const UnlockPopupHeader = styled.div`
  position: relative;
  display: flex;
  align-items: baseline;
  gap: ${vw(6)};
  padding: ${vw(16)} ${vw(16)} ${vw(10)};
`;

/** 弹层标题 */
export const UnlockPopupTitle = styled.div`
  font-size: ${vw(15)};
  font-weight: bold;
  color: #333;
`;

/** 信件总数 */
export const UnlockPopupCount = styled.div`
  font-size: ${vw(11)};
  color: #999;
`;

/** 关闭弹层按钮 */
export const UnlockCloseBtn = styled.div`
  position: absolute;
  right: ${vw(16)};
  top: 50%;
  transform: translateY(-50%);
  padding: ${vw(4)};
  cursor: pointer;
`;

/** 信件列表（滚动加载区域） */
export const UnlockList = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0 ${vw(16)} ${vw(16)};
`;

/** 底部加载/没有更多提示 */
export const LoadMore = styled.div`
  text-align: center;
  font-size: ${vw(11)};
  color: #bbb;
  padding: ${vw(12)} 0;
`;
