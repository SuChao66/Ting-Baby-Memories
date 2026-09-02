import styled from "styled-components";
import { vw } from "@/utils";

/** 云相册容器 */
export const CloudAlbumContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(12)};
  height: 100%;
  overflow: hidden;
`;

/* ========== Tab 栏 ========== */
export const TabCard = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  background: #fff;
  border-radius: ${vw(20)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
  padding: ${vw(8)} ${vw(12)};
`;

export const TabItem = styled.div<{ $active?: boolean }>`
  flex: 1;
  height: ${vw(28)};
  line-height: ${vw(28)};
  text-align: center;
  font-size: ${vw(14)};
  color: ${(props) => (props.$active ? "#fff" : "#2d2d2d")};
  font-weight: ${(props) => (props.$active ? 600 : 400)};
  background: ${(props) =>
    props.$active
      ? "linear-gradient(135deg, #ff8fa8 0%, #ff6b8a 100%)"
      : "transparent"};
  border-radius: ${vw(99)};
  cursor: pointer;
  transition: all 0.25s;
`;

export const Divider = styled.div`
  width: ${vw(1)};
  height: ${vw(20)};
  background: #ffe3ec;
  margin: 0 ${vw(10)};
  flex-shrink: 0;
`;

export const ViewSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(6)};
  flex-shrink: 0;
  font-size: ${vw(11)};
  color: #646566;
`;

export const SwitchTrack = styled.div<{ $on?: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: ${vw(36)};
  height: ${vw(20)};
  border-radius: ${vw(10)};
  background: ${(props) => (props.$on ? "#ff6b8a" : "#f3d9e0")};
  transition: background 0.2s;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    top: ${vw(2)};
    left: ${(props) =>
      props.$on ? `calc(100% - ${vw(16)} - ${vw(2)})` : vw(2)};
    width: ${vw(16)};
    height: ${vw(16)};
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 ${vw(1)} ${vw(3)} rgba(0, 0, 0, 0.1);
    transition: left 0.2s;
  }
`;

/* ========== 月份切换栏 ========== */
export const MonthBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${vw(16)};
  flex-shrink: 0;
  padding: ${vw(4)} 0;
`;

export const MonthArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${vw(28)};
  height: ${vw(28)};
  border-radius: 50%;
  color: #ff6b8a;
  background: #fff0f3;
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
`;

export const MonthText = styled.span`
  font-size: ${vw(15)};
  font-weight: 600;
  color: #2d2d2d;
`;

/* ========== 相册列表 ========== */
export const AlbumList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: ${vw(20)};
  display: flex;
  flex-direction: column;
  gap: ${vw(16)};
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DayGroup = styled.div`
  background: #fff;
  border-radius: ${vw(20)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
  padding: ${vw(16)};
`;

export const DayHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(10)};
  padding-bottom: ${vw(12)};
`;

export const DayDate = styled.span`
  font-size: ${vw(16)};
  font-weight: 500;
  color: #2d2d2d;
`;

/* ========== 照片网格 ========== */
export const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${vw(8)};
`;
