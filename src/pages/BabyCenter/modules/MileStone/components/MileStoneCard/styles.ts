import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 大事记卡片 */
export const MilestoneCard = styled.div`
  padding: ${vw(14)};
  margin-bottom: ${vw(12)};
  background: #fff;
  border: ${vw(1)} solid #ffe9ee;
  border-radius: ${vw(12)};
  box-shadow: 0 ${vw(4)} ${vw(16)} rgba(249, 126, 147, 0.1);
`;

/** 卡片头部：日期 + 月龄 */
export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(8)};
  margin-bottom: ${vw(10)};
`;

/** 记录日期 */
export const CardDate = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${vw(6)};
  font-size: ${vw(14)};
  color: #ff6b8a;
`;

/** 大事记发生时的月龄 */
export const AgeTag = styled.span`
  margin-left: auto;
  font-size: ${vw(12)};
  color: #ff6b8a;
  background: #fff0f3;
  padding: ${vw(2)} ${vw(10)};
  border-radius: ${vw(99)};
`;

/** 记录内容 */
export const CardContent = styled.p`
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
