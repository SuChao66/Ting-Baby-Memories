import styled, { keyframes } from "styled-components";
import { vw } from "@/utils";

/** 底部滑出动画 */
const slideUp = keyframes`
  from {
    transform: translateY(110%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

/** 摘要卡片：底部滑出毛玻璃 */
export const DetailCard = styled.div`
  position: absolute;
  left: ${vw(12)};
  right: ${vw(12)};
  bottom: ${vw(16)};
  z-index: 14;
  display: flex;
  flex-direction: column;
  gap: ${vw(12)};
  padding: ${vw(8)} ${vw(16)};
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: ${vw(20)};
  background: rgba(26, 26, 62, 0.62);
  backdrop-filter: blur(16px);
  box-shadow: 0 ${vw(-8)} ${vw(32)} rgba(10, 10, 31, 0.6);
  animation: ${slideUp} 0.32s cubic-bezier(0.22, 1, 0.36, 1);
  max-height: 80%;
  overflow: auto;
`;

/** 卡片头部行：缩略图 + 时间 */
export const DetailHead = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(12)};
`;

/** 缩略图容器 */
export const DetailThumb = styled.div`
  position: relative;
  flex-shrink: 0;
  width: ${vw(64)};
  height: ${vw(64)};
  border-radius: ${vw(14)};
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${vw(22)};
`;

/** 缩略图图片 */
export const DetailThumbImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/** 头部右侧信息列 */
export const DetailHeadInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(4)};
  min-width: 0;
`;

/** 记录时间 */
export const DetailTime = styled.div`
  font-size: ${vw(12)};
  font-weight: 600;
  color: #ffd700;
  letter-spacing: ${vw(1)};
`;

/** 标签行 */
export const DetailTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${vw(6)};
`;

/** 单个标签 chip */
export const DetailTag = styled.span`
  padding: ${vw(2)} ${vw(10)};
  border-radius: ${vw(999)};
  font-size: ${vw(10)};
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

/** 内容摘要 */
export const DetailContent = styled.div`
  font-size: ${vw(14)};
  line-height: ${vw(22)};
  color: #e6e9f8;
  text-align: justify;
`;

/** 素材区：详情卡片内图片 / 视频 / 音频纵向列表 */
export const DetailMedia = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(10)};
  width: 100%;
`;

/** 素材图片：圆角宽度自适应 */
export const DetailImage = styled.img`
  width: 100%;
  border-radius: ${vw(8)};
  border: 1px solid rgba(255, 255, 255, 0.1);
  object-fit: cover;
  display: block;
`;

/** 视频封面容器：点击全屏播放 */
export const DetailVideo = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${vw(12)};
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;
`;

/** 视频封面帧 */
export const DetailVideoCover = styled.video`
  width: 100%;
  display: block;
  object-fit: cover;
  max-height: ${vw(220)};
`;

/** 视频播放徽标：封面居中半透明圆底 */
export const DetailPlayBadge = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${vw(44)};
  height: ${vw(44)};
  border-radius: 50%;
  background: rgba(10, 10, 31, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  pointer-events: none;
`;

/** 音频播放器容器：深色内衬圆角 */
export const DetailAudio = styled.div`
  width: 100%;
  padding: ${vw(8)} ${vw(10)};
  border-radius: ${vw(12)};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);

  audio {
    width: 100%;
    display: block;
  }
`;

/** 缩略图占位角标：无首图时的视频 / 音频标识（覆盖整格） */
export const DetailThumbBadge = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: rgba(10, 10, 31, 0.3);
  pointer-events: none;
`;

/** 缩略图视频首帧 */
export const DetailThumbVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/** 里程碑徽标 */
export const DetailMilestone = styled.span`
  align-self: flex-start;
  padding: ${vw(2)} ${vw(10)};
  border-radius: ${vw(999)};
  font-size: ${vw(10)};
  font-weight: 600;
  color: #0a0a1f;
  background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);
`;

/** 关闭按钮：卡片右上角 */
export const DetailClose = styled.button`
  position: absolute;
  top: ${vw(10)};
  right: ${vw(10)};
  width: ${vw(26)};
  height: ${vw(26)};
  border: none;
  border-radius: 50%;
  font-size: ${vw(12)};
  color: #99a0c0;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.08);
  transition:
    transform 0.15s ease,
    color 0.15s ease;
  &:active {
    transform: scale(0.9);
    color: #ffffff;
  }
`;
