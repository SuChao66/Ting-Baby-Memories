import styled from "styled-components";
import { vw } from "@/utils";

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
  position: relative;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* 文件类型角标 */
export const FileTypeBadge = styled.div`
  position: absolute;
  bottom: ${vw(4)};
  left: ${vw(4)};
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: ${vw(10)};
  padding: ${vw(2)} ${vw(6)};
  border-radius: ${vw(4)};
  display: flex;
  align-items: center;
  gap: ${vw(2)};
`;
