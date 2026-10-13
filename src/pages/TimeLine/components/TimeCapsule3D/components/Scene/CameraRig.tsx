// 导入 hooks
import { useMemo, useRef } from "react";
// 导入 three 与 fiber
import * as THREE from "three";
// 导入hook
import { useFrame, useThree } from "@react-three/fiber";

/** 全局视角基础位姿：悬浮于隧道深处轴心，望向洞口（+Z），环与脊线向尽头收敛 */
const GLOBAL_CAMERA_POS = new THREE.Vector3(0, 0, -14.5);
const GLOBAL_TARGET = new THREE.Vector3(0, 0, 0);
/** 过渡超时兜底：防止到位判定被扰动卡死占用控制权 */
const TRANSITION_TIMEOUT = 2.5;
/** 飞入月内视图时相机相对月份节点的偏移（沿轴朝洞口 + 径向外扩） */
const FOCUS_OFFSET = new THREE.Vector3(1.4, 1.0, 2.6);

/** OrbitControls 最小接口（makeDefault 后从 fiber 状态获取） */
interface IControlsLike {
  target: THREE.Vector3;
  update: () => void;
}

interface IProps {
  /** 聚焦月份节点的世界坐标，null = 全局隧道视角 */
  focusPosition: [number, number, number] | null;
}

/** 相机调度：隧道全景与月内聚焦间的平滑飞入过渡（帧率无关阻尼） */
function CameraRig(props: IProps) {
  const { focusPosition } = props;
  // 获取相机
  const camera = useThree((state) => state.camera);
  // 获取控制器
  const controls = useThree(
    (state) => state.controls,
  ) as unknown as IControlsLike | null;

  // 目标位姿缓存，避免每帧新建向量
  const desired = useMemo(
    () => ({
      position: new THREE.Vector3(),
      target: new THREE.Vector3(),
    }),
    [],
  );
  // 过渡状态机：模式变化时启动，到位或超时后停止干预，交还 OrbitControls
  const lastKeyRef = useRef<string | null>(null);
  const activeRef = useRef(false);
  const elapsedRef = useRef(0);
  const modeKey = focusPosition ? `focus:${focusPosition.join(",")}` : "global";

  useFrame((_, delta) => {
    // 聚焦/全景模式变化时重新启动飞入过渡
    if (lastKeyRef.current !== modeKey) {
      lastKeyRef.current = modeKey;
      activeRef.current = true;
      elapsedRef.current = 0;
    }
    if (!activeRef.current) return;
    elapsedRef.current += delta;

    if (focusPosition) {
      // 月内聚焦：相机贴近节点，视线锁定节点
      desired.position.set(...focusPosition).add(FOCUS_OFFSET);
      desired.target.set(...focusPosition);
    } else {
      // 全局视角：固定于隧道深处轴心望向洞口，环包围四周天然竖横屏通吃
      desired.position.copy(GLOBAL_CAMERA_POS);
      desired.target.copy(GLOBAL_TARGET);
    }

    // 帧率无关阻尼：delta 越大步进越大，不同设备过渡速度一致
    const k = 1 - Math.pow(0.001, Math.min(delta, 0.1));
    camera.position.lerp(desired.position, k);
    if (controls) {
      controls.target.lerp(desired.target, k);
      controls.update();
    }

    // 到位判定：位置与视线目标收敛，或超时兜底，结束后交还控制权
    const reached =
      (camera.position.distanceTo(desired.position) < 0.05 &&
        (!controls || controls.target.distanceTo(desired.target) < 0.05)) ||
      elapsedRef.current > TRANSITION_TIMEOUT;
    if (reached) {
      activeRef.current = false;
    }
  });
  // 无渲染实体：仅负责相机调度
  return null;
}

export default CameraRig;
