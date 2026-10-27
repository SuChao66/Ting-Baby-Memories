import { Suspense, useEffect, useState } from "react";
// 导入组件
import Door from "../Door/index";
// 导入 fiber 与 drei 控制器
import { OrbitControls } from "@react-three/drei";
// 导入类型
import type { IYearCluster } from "@/interface/timeline";
import * as THREE from "three";

interface IProps {
  yearClusters: IYearCluster[];
}

function Scene(props: IProps) {
  const { yearClusters } = props;
  const [years, setYears] = useState<number[]>([]);
  const [doorPostions, setDoorPositions] = useState({});

  useEffect(() => {
    // 获取年份簇
    const years = yearClusters.map((item) => item.key);
    setYears(years);
    // 设置门的位置
    const doorPositions = {};
    years.forEach((year, index) => {
      const x = index * 2;
      doorPositions[year] = new THREE.Vector3(x, 0, 0);
    });
    setDoorPositions(doorPositions);
  }, [yearClusters]);

  return (
    <>
      {/* 灯光：环境光 + 主方向光  */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />

      {/* 坐标轴 */}
      <axesHelper args={[5]} />

      {/* 模型加载组件-门 */}
      {/* 使用 Suspense 处理加载等待状态 */}
      {years.map((year, index) => {
        return (
          <Suspense key={index} fallback="loading...">
            <Door year={year} position={doorPostions[year]} />
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
