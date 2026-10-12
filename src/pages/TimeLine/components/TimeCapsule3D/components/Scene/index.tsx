// 导入 hooks
import { useMemo } from "react";
// 导入 fiber 与 drei 控制器
import { OrbitControls } from "@react-three/drei";
// 导入月份簇与胶囊类型
import type { ICapsuleData, IMonthCluster } from "../../types";
// 导入全局视图层、月内视图层与相机调度
import MonthClusters from "../MonthClusters/index";
import MonthCapsules from "../MonthCapsules/index";
import CameraRig from "./CameraRig";

/** 聚焦期间月份节点选择置空：防止月内视角误触其他月份 */
const NO_OP = () => undefined;

interface IProps {
  /** 月份簇数组（时间正序） */
  clusters: IMonthCluster[];
  /** 当前聚焦月份，null = 全局全景 */
  focusedMonth: string | null;
  /** 点击月份节点回调（状态提升至入口组件） */
  onSelectMonth: (month: string) => void;
  /** 点击月内胶囊回调（状态提升至入口组件） */
  onPickCapsule: (capsule: ICapsuleData) => void;
}

/** 3D 场景主组件：灯光、雾、相机调度与全局/月内双层切换 */
function Scene(props: IProps) {
  const { clusters, focusedMonth, onSelectMonth, onPickCapsule } = props;

  // 聚焦月份簇：供相机飞入定位与当月实例构建
  const focusedCluster = useMemo(
    () => clusters.find((cluster) => cluster.month === focusedMonth) ?? null,
    [clusters, focusedMonth],
  );

  return (
    <>
      {/* 深空雾效：远景融入背景，增强纵深 */}
      <fog attach="fog" args={["#0A0A1F", 20, 46]} />

      {/* 灯光：环境光 + 主方向光 + 冷暖点光呼应轨道两端 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      {/* 出生端冷蓝光（底部外圈） */}
      <pointLight position={[0, -5, 6]} intensity={12} color="#64B5F6" />
      {/* 当前端暖粉光（顶部内圈） */}
      <pointLight position={[0, 3.5, -2]} intensity={10} color="#FF6B8A" />

      {/* 全局视图层：星空 + 螺旋轨道 + 月份簇节点（月内时保留作背景锚点） */}
      <MonthClusters
        clusters={clusters}
        focusedMonth={focusedMonth}
        onSelectMonth={focusedMonth ? NO_OP : onSelectMonth}
      />

      {/* 月内视图层：飞入月份时挂载当月 InstancedMesh 胶囊，退出即销毁 */}
      {/* group 定位到月份节点：胶囊局部坐标以节点为原点散布 */}
      {focusedCluster && (
        <group position={focusedCluster.position}>
          <MonthCapsules
            capsules={focusedCluster.capsules}
            onPick={onPickCapsule}
          />
        </group>
      )}

      {/* 相机调度：全景与聚焦间的飞入过渡 */}
      <CameraRig
        focusPosition={focusedCluster ? focusedCluster.position : null}
      />

      {/* 轨道控制器：阻尼漫游，聚焦时停用自动旋转 */}
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        minDistance={3}
        maxDistance={30}
        maxPolarAngle={Math.PI * 0.92}
        autoRotate={!focusedMonth}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default Scene;
