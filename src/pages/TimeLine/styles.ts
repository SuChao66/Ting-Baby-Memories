import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 记录容器 */
export const TimeLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  gap: ${vw(12)};

  &::-webkit-scrollbar {
    display: none;
  }

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/** 时间线容器 */
export const TimelineWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${vw(16)};
  padding-left: ${vw(8)};
  margin-top: ${vw(8)};
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

/** 时间线条目 */
export const TimelineItem = styled.div`
  position: relative;
  display: flex;
  padding-left: ${vw(24)};

  /* 节点圆点 */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: ${vw(6)};
    width: ${vw(14)};
    height: ${vw(14)};
    border-radius: 50%;
    background: #fff;
    border: ${vw(3)} solid #ff9eb5;
    box-sizing: border-box;
    z-index: 1;
  }
`;

/** 记录卡片 */
export const RecordCard = styled.div`
  flex: 1;
  background: #fff;
  border-radius: ${vw(12)};
  padding: ${vw(14)};
  box-shadow: 0 ${vw(2)} ${vw(12)} rgba(255, 107, 138, 0.08);
`;

/** 记录头部 */
export const RecordHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${vw(8)};
`;

/** 记录时间 */
export const RecordTime = styled.span`
  font-size: ${vw(12)};
  color: #00000073;
`;

/** 标签容器 */
export const TagWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(6)};
`;

/** 记录标签 */
export const RecordTag = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: ${vw(11)};
  color: #ff6b8a;
  background: #fff0f3;
  padding: ${vw(2)} ${vw(8)};
  border-radius: ${vw(10)};
`;

/** 记录内容 */
export const RecordContent = styled.p`
  font-size: ${vw(14)};
  color: #2d2d2d;
  line-height: ${vw(22)};
  margin: 0;
  word-break: break-word;
`;

/** 图片网格 */
export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${vw(6)};
  margin-top: ${vw(10)};
`;

/** 图片项 */
export const GridImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${vw(8)};
  overflow: hidden;
  background: #f5f5f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/** 悬浮按钮 */
export const FloatButton = styled.div`
  position: fixed;
  right: ${vw(20)};
  bottom: ${vw(80)};
  width: ${vw(48)};
  height: ${vw(48)};
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
  box-shadow: 0 ${vw(4)} ${vw(16)} rgba(255, 107, 138, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  cursor: pointer;

  &:active {
    opacity: 0.85;
  }
`;
