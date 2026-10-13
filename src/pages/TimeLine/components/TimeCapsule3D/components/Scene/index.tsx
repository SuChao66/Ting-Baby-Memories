// 导入 hooks
import { useMemo } from "react";
// 导入 fiber 与 drei 控制器
import { OrbitControls } from "@react-three/drei";
// 导入月份簇类型
import type { IMonthCluster } from "../../types";
// 导入全局视图层与相机调度
import MonthClusters from "../MonthClusters/index";
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
}

/** 3D 场景主组件：灯光、雾、相机调度与月份节点渲染（月内记录列表为 DOM 覆盖层） */
function Scene(props: IProps) {
  const { clusters, focusedMonth, onSelectMonth } = props;

  // 聚焦月份簇：供相机飞入定位
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

      {/* 全局视图层：星空 + 螺旋轨道 + 月份簇节点（月内时保留作背景锚点，月内记录列表为覆盖层） */}
      <MonthClusters
        clusters={clusters}
        focusedMonth={focusedMonth}
        onSelectMonth={focusedMonth ? NO_OP : onSelectMonth}
      />

      {/* 相机调度：全景与聚焦间的飞入过渡 */}
      <CameraRig
        focusPosition={focusedCluster ? focusedCluster.position : null}
      />

      {/* 轨道控制器：阻尼漫游，聚焦时停用自动旋转；视角锁在隧道轴线附近防出壁
          极角 ±0.09rad：最远缩放 35 时相机横偏 35*sin(0.09)≈3.1，仍在管半径 3.4 内
          方位角锁死 π（正后轴线）：水平拖动会侧转出管，且方位角窗口跨 ±π 有环绕跳变，故锁单点 */}
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        minDistance={3}
        maxDistance={40}
        minPolarAngle={Math.PI / 2 - 0.12}
        maxPolarAngle={Math.PI / 2 + 0.12}
        minAzimuthAngle={Math.PI}
        maxAzimuthAngle={Math.PI}
      />
    </>
  );
}

export default Scene;
