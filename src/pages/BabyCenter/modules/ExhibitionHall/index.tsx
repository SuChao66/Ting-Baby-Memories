import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
// 导入组件
import CapsuleLoading from "@/components/CapsuleLoading";
import CapsuleEmpty from "@/components/CapsuleEmpty";
import Scene from "./components/Scene/index";
// 导入hook
import { useMilestoneData } from "@/hooks";
// 导入样式
import { ExhibitionHallContainer, CanvasWrap } from "./styles";
// 导入类型
import type { IYearCluster } from "@/interface/timeline";

function ExhibitionHall() {
  const { id } = useParams();

  const navigate = useNavigate();

  // 数据层：加载进度、精简记录、失败标记与重试
  const { loading, progress, items, error, retry } = useMilestoneData(
    id ? id : "",
    true,
  );
  // 年份簇
  const [yearClusters, setYearClusters] = useState<IYearCluster[]>([]);

  useEffect(() => {
    // 将数据划分为年份簇
    const yearClusters = new Map();
    items.forEach((item) => {
      const year = new Date(item.publishTime).getFullYear();
      if (!yearClusters.has(year)) {
        yearClusters.set(year, []);
      } else {
        yearClusters.get(year)?.push(item);
      }
    });
    setYearClusters(
      Array.from(yearClusters, ([key, value]) => ({ key, value })),
    );
  }, [items]);

  return (
    <ExhibitionHallContainer>
      {loading ? (
        // 加载态：遮罩下不挂载 Canvas，避免空数据渲染
        <CapsuleLoading progress={progress} />
      ) : items.length === 0 ? (
        // 空态：无记录引导（去记录）/ 加载失败重试
        <CapsuleEmpty
          error={error}
          onRetry={retry}
          onAdd={() => navigate("/add-timeline")}
        />
      ) : (
        <CanvasWrap>
          {/* alpha 开启透明背景，露出外层深空渐变 */}
          <Canvas
            gl={{ alpha: true }}
            camera={{ position: [5, 5, 4.5], fov: 45 }}
          >
            <Scene yearClusters={yearClusters} />
          </Canvas>
        </CanvasWrap>
      )}
    </ExhibitionHallContainer>
  );
}

export default ExhibitionHall;
