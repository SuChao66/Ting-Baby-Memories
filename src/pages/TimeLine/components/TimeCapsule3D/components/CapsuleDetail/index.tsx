// 导入 hooks
import { useState } from "react";
// 导入尺寸工具与图标
import { vw } from "@/utils";
import { AiOutlinePlayCircle, AiOutlineSound } from "react-icons/ai";
// 导入摘要卡片样式（集中定义于上级 styles.ts）
import {
  DetailCard,
  DetailClose,
  DetailHead,
  DetailThumb,
  DetailThumbImg,
  DetailThumbVideo,
  DetailThumbBadge,
  DetailHeadInfo,
  DetailTime,
  DetailTags,
  DetailTag,
  DetailMilestone,
  DetailContent,
  DetailMedia,
  DetailImage,
  DetailVideo,
  DetailVideoCover,
  DetailPlayBadge,
  DetailAudio,
} from "./styles";
// 导入胶囊类型
import type { ICapsuleData } from "../../types";
// 导入视频全屏预览（与时间线列表卡片交互一致）
import VideoPreview from "@/baseUI/videoPreview";
// 导入icon
import { CiImageOff } from "react-icons/ci";

/** 格式化记录时间：ISO / 时间戳字符串 → 'YYYY-MM-DD HH:mm' */
function formatCapsuleTime(publishTime: string): string {
  const date = new Date(publishTime);
  if (Number.isNaN(date.getTime())) return publishTime;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

interface IProps {
  /** 选中的胶囊数据 */
  capsule: ICapsuleData;
  /** 关闭卡片回调 */
  onClose: () => void;
}

/** 胶囊摘要卡片：底部滑出毛玻璃，展示缩略图、素材、时间、标签与内容 */
function CapsuleDetail(props: IProps) {
  const { capsule, onClose } = props;
  // 视频全屏预览地址（null = 关闭）
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

  // 无首图时的缩略图占位素材
  const firstVideo = capsule.files.find((file) => file.type === "VIDEO");
  const firstAudio = capsule.files.find((file) => file.type === "AUDIO");

  return (
    <>
      <DetailCard>
        <DetailClose onClick={onClose}>✕</DetailClose>

        <DetailHead>
          <DetailThumb>
            {capsule.thumbUrl ? (
              <DetailThumbImg src={capsule.thumbUrl} alt={capsule.content} />
            ) : firstVideo ? (
              <>
                {/* 无首图的视频记录：展示首帧 + 播放标识 */}
                <DetailThumbVideo
                  src={firstVideo.url}
                  muted
                  playsInline
                  preload="metadata"
                />
                <DetailThumbBadge>
                  <AiOutlinePlayCircle size={vw(22)} />
                </DetailThumbBadge>
              </>
            ) : firstAudio ? (
              // 无首图无视频的音频记录：声音标识占位
              <DetailThumbBadge>
                <AiOutlineSound size={vw(22)} />
              </DetailThumbBadge>
            ) : (
              <CiImageOff color="#fff" />
            )}
          </DetailThumb>
          <DetailHeadInfo>
            <DetailTime>{formatCapsuleTime(capsule.publishTime)}</DetailTime>
            <DetailTags>
              {capsule.tags.slice(0, 3).map((tag) => (
                <DetailTag key={tag}>{tag}</DetailTag>
              ))}
            </DetailTags>
          </DetailHeadInfo>
        </DetailHead>

        {capsule.isMilestone && <DetailMilestone>里程碑时刻</DetailMilestone>}

        <DetailContent>{capsule.content}</DetailContent>

        {/* 素材区：图片内联展示，视频点击全屏播放，音频内联播放 */}
        {capsule.files.length > 0 && (
          <DetailMedia>
            {capsule.files.map((file, index) => {
              const key = `${index}-${file.url}`;
              if (file.type === "IMAGE") {
                return (
                  <DetailImage
                    key={key}
                    src={file.url}
                    alt="素材图片"
                    loading="lazy"
                  />
                );
              }
              if (file.type === "VIDEO") {
                return (
                  <DetailVideo
                    key={key}
                    onClick={() => setVideoPreviewUrl(file.url)}
                  >
                    <DetailVideoCover
                      src={file.url}
                      muted
                      playsInline
                      preload="metadata"
                    />
                    <DetailPlayBadge>
                      <AiOutlinePlayCircle size={vw(26)} />
                    </DetailPlayBadge>
                  </DetailVideo>
                );
              }
              return (
                <DetailAudio key={key}>
                  <audio controls preload="metadata" src={file.url} />
                </DetailAudio>
              );
            })}
          </DetailMedia>
        )}
      </DetailCard>

      {/* 视频全屏预览 */}
      {videoPreviewUrl && (
        <VideoPreview
          videoPreviewUrl={videoPreviewUrl}
          setVideoPreviewUrl={setVideoPreviewUrl}
        />
      )}
    </>
  );
}

export default CapsuleDetail;
