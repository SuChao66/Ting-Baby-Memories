import { Suspense, useEffect, useState } from "react";
// 导入组件
import Door from "../Door/index";
// 导入 fiber 与 drei 控制器
import { OrbitControls } from "@react-three/drei";
// 导入类型
import type { IYearCluster } from "@/interface/timeline";

interface IProps {
  yearClusters: IYearCluster[];
}

function Scene(props: IProps) {
  const { yearClusters } = props;
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    setYears(yearClusters.map((item) => item.key));
  }, [yearClusters]);

  return (
    <>
      {/* 灯光：环境光 + 主方向光  */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.4} />
      </mesh>

      {/* 模型加载组件-门 */}
      {/* 使用 Suspense 处理加载等待状态 */}
      {years.map((year, index) => {
        return (
          <Suspense key={index} fallback="loading...">
            <Door year={year} />
          </Suspense>
        );
      })}

      {/* 轨道控制器：阻尼漫游 */}
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        minDistance={3}
        maxDistance={200}
      />
    </>
  );
}

export default Scene;
