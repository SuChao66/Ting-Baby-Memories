import { AiOutlineClose } from "react-icons/ai";
// 导入工具函数
import { vw } from "@/utils";

interface IProps {
  videoPreviewUrl: string;
  setVideoPreviewUrl: (url: string) => void;
}

function VideoPreview(props: IProps) {
  const { videoPreviewUrl, setVideoPreviewUrl } = props;

  return (
    <div
      onClick={() => setVideoPreviewUrl(null)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.9)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <video
        src={videoPreviewUrl}
        controls
        autoPlay
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
      <AiOutlineClose
        size={vw(24)}
        color="#fff"
        style={{
          position: "absolute",
          top: vw(16),
          right: vw(16),
          cursor: "pointer",
        }}
        onClick={() => setVideoPreviewUrl(null)}
      />
    </div>
  );
}

export default VideoPreview;
