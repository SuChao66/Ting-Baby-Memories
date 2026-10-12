// 导入样式（集中定义于上级目录 styles.ts）
import {
  LoadingMask,
  LoadingRing,
  LoadingCore,
  LoadingText,
  LoadingPercent,
} from "./styles";

interface IProps {
  /** 加载进度 0-100 */
  progress: number;
}

/** 3D 胶囊加载态：深空毛玻璃遮罩 + 双色旋转环 + 进度 */
function CapsuleLoading(props: IProps) {
  const { progress } = props;

  return (
    <LoadingMask>
      <LoadingRing>
        <LoadingCore />
      </LoadingRing>
      <LoadingText>
        正在汇聚时光胶囊
        {progress > 0 && progress < 100 && (
          <LoadingPercent> {progress}%</LoadingPercent>
        )}
      </LoadingText>
    </LoadingMask>
  );
}

export default CapsuleLoading;
