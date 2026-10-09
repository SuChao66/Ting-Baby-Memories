import styled from "styled-components";
import { vw } from "@/utils";

/** 疫苗接种容器 */
export const VaccineContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

/** 导航栏"补录"按钮 */
export const AddBtn = styled.div`
  padding: ${vw(4)} ${vw(14)};
  border-radius: ${vw(14)};
  background: #ff6b8a;
  color: #fff;
  font-size: ${vw(14)};
  cursor: pointer;

  &:active {
    opacity: 0.85;
  }
`;

/** 页签栏：免费疫苗 / 自费疫苗 */
export const TabBar = styled.div`
  display: flex;
  margin-top: ${vw(10)};
`;

/** 页签项 */
export const TabItem = styled.div<{ $active: boolean }>`
  flex: 1;
  text-align: center;
  position: relative;
  padding: ${vw(6)} 0;
  font-size: ${vw(16)};
  color: ${({ $active }) => ($active ? "#ff6b8a" : "#9c9c9c")};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
  transition: color 0.2s;

  /* 选中态下划线 */
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: ${vw(20)};
    height: ${vw(3)};
    border-radius: ${vw(2)};
    background: #ff6b8a;
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 0.2s;
  }
`;

/** 内容滚动区域 */
export const ScrollArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: ${vw(12)} 0;
  display: flex;
  flex-direction: column;
  gap: ${vw(14)};
  &::-webkit-scrollbar {
    display: none;
  }
`;

/** 逾期提醒卡 */
export const OverdueBanner = styled.div`
  border-radius: ${vw(14)};
  padding: ${vw(12)} ${vw(14)};
  background: rgba(250, 81, 81, 0.06);
  border: ${vw(1)} solid rgba(250, 81, 81, 0.2);
`;

/** 逾期提醒标题 */
export const OverdueTitle = styled.div`
  color: #fa5151;
  font-size: ${vw(14)};
  font-weight: 600;
  margin-bottom: ${vw(8)};
`;

/** 逾期剂次列表 */
export const OverdueList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(6)};
`;

/** 逾期剂次条目 */
export const OverdueItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${vw(8)};
  color: #646566;
  font-size: ${vw(12)};
`;

/** 逾期登记入口 */
export const OverdueRegister = styled.button`
  flex-shrink: 0;
  padding: ${vw(3)} ${vw(12)};
  border: none;
  border-radius: ${vw(12)};
  background: #fa5151;
  color: #fff;
  font-size: ${vw(12)};
  cursor: pointer;

  &:active {
    opacity: 0.85;
  }
`;

/** 自费 Tab 顶部说明条 */
export const PaidIntro = styled.div`
  border-radius: ${vw(12)};
  padding: ${vw(8)} 0;
  background: #fff0f3;
  color: #00000073;
  font-size: ${vw(12)};
  line-height: ${vw(22)};
`;

/** 自费疫苗卡片列表 */
export const PaidList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(10)};
`;

/** 疫苗库展开/收起按钮 */
export const LibraryToggle = styled.div`
  text-align: center;
  padding: ${vw(10)} 0;
  color: #ff6b8a;
  font-size: ${vw(14)};
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;
