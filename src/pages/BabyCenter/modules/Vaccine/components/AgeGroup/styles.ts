import styled from "styled-components";
import { vw } from "@/utils";

/** 分组容器：左侧时间轴竖线 */
export const GroupWrap = styled.div`
  position: relative;
  padding-left: ${vw(24)};

  /* 时间轴竖线 */
  &::before {
    content: "";
    position: absolute;
    left: ${vw(5)};
    top: ${vw(10)};
    bottom: ${vw(-12)};
    width: ${vw(2)};
    background: #ffd9e1;
    border-radius: ${vw(1)};
  }

  &:last-child::before {
    display: none;
  }
`;

/** 组头行：节点圆点 + 月龄标题 */
export const GroupHead = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(8)};
  margin-bottom: ${vw(8)};
`;

/** 时间轴节点圆点 */
export const AgeDot = styled.div<{ $allDone: boolean }>`
  position: absolute;
  left: 0;
  width: ${vw(12)};
  height: ${vw(12)};
  border-radius: 50%;
  background: ${({ $allDone }) => ($allDone ? "#00b578" : "#ff6b8a")};
  border: ${vw(3)} solid #fff;
  box-shadow: 0 0 0 ${vw(2)}
    ${({ $allDone }) => ($allDone ? "rgba(0, 181, 120, 0.3)" : "rgba(255, 107, 138, 0.3)")};
`;

/** 月龄标题 */
export const AgeTitle = styled.div`
  font-size: ${vw(14)};
  font-weight: 600;
  color: #2d2d2d;
`;

/** 当前阶段标记 */
export const CurrentTag = styled.div`
  padding: ${vw(1)} ${vw(8)};
  border-radius: ${vw(10)};
  background: linear-gradient(135deg, #ff8fa8 0%, #ff6b8a 100%);
  color: #fff;
  font-size: ${vw(10)};
`;

/** 组内剂次卡片列表 */
export const DoseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(10)};
`;
