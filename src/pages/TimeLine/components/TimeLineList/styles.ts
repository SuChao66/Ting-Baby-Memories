import styled from "styled-components";
import { vw } from "@/utils";

/** 时间线容器 */
export const TimelineWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${vw(16)};
  flex: 1;
  overflow: auto;
  background-color: #fff;
  padding: ${vw(24)} ${vw(12)};
  box-sizing: border-box;
  border-radius: ${vw(12)};
`;

/** 时间线日期分组 */
export const TimelineGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${vw(12)};

  /* 贯穿分组的垂直连接线，延伸到下一个分组 */
  &::before {
    content: "";
    position: absolute;
    left: ${vw(6)};
    top: ${vw(8)};
    bottom: ${vw(-16)};
    width: ${vw(2)};
    background: #ffe3ec;
  }

  &:last-child::before {
    bottom: 0;
  }
`;

/** 日期标题 */
export const DateLabel = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${vw(8)};
  font-size: ${vw(14)};
  font-weight: 600;
  color: #00000099;
  padding-left: ${vw(20)};

  /* 日期节点圆点 */
  &::before {
    content: "";
    position: absolute;
    left: ${vw(2)};
    top: 50%;
    transform: translateY(-50%);
    width: ${vw(10)};
    height: ${vw(10)};
    border-radius: 50%;
    background: #ff6b8a;
    z-index: 1;
  }
`;
