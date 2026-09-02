import { useState } from "react";
import { MediaCard, FileTypeBadge } from "./styles";
// 导入图标
import { AiOutlinePlayCircle, AiOutlinePicture } from "react-icons/ai";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入组件
import VideoPreview from "@/baseUI/videoPreview";
// 导入类型
import type { IFile } from "@/interface/timeline";

interface MediaItemProps {
  /** 当前日期下的文件列表 */
  files: IFile[];
  /** 当前文件索引 */
  index: number;
}

function MediaItem({ files, index }: MediaItemProps) {
  const file = files[index];

  // 视频全屏预览地址
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  // 图片预览
  const [previewVisible, setPreviewVisible] = useState(false);
  // 点击的文件在图片列表中的索引
  const [previewIndex, setPreviewIndex] = useState(0);

  // 点击文件预览
  const handlePreview = () => {
    if (file.type === "VIDEO") {
      setVideoPreviewUrl(file.url);
    } else {
      // 计算在图片列表中的索引
      const imageIndex = files
        .slice(0, index)
        .filter((f) => f.type === "IMAGE").length;
      setPreviewIndex(imageIndex);
      setPreviewVisible(true);
    }
  };

  return (
    <>
      <MediaCard onClick={handlePreview}>
        {file.type === "IMAGE" ? (
          <img src={file.url} alt="记录图片" />
        ) : (
          <video src={file.url} muted />
        )}
        <FileTypeBadge>
          {file.type === "VIDEO" ? (
            <>
              <AiOutlinePlayCircle size={vw(10)} />
              视频
            </>
          ) : (
            <>
              <AiOutlinePicture size={vw(10)} />
              图片
            </>
          )}
        </FileTypeBadge>
      </MediaCard>

      {/* 视频全屏预览 */}
      {videoPreviewUrl && (
        <VideoPreview
          videoPreviewUrl={videoPreviewUrl}
          setVideoPreviewUrl={setVideoPreviewUrl}
        />
      )}

      {/* 图片全屏预览 */}
      <ImagePreview
        visible={previewVisible}
        images={files
          .filter((f) => f.type === "IMAGE")
          .map((f) => ({ src: f.url }))}
        defaultValue={previewIndex}
        onClose={() => setPreviewVisible(false)}
      />
    </>
  );
}

export default MediaItem;
