// 导入 hooks
import { useEffect, useMemo, useRef } from "react";
// 导入 three 与 fiber
import * as THREE from "three";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
// 导入月份簇类型与节点尺寸计算
import type { IMonthCluster } from "../../types";
import { getClusterNodeSize } from "../../utils";

/** 顶点着色器：尺寸随记录数、脉冲呼吸与距离衰减 */
const VERTEX_SHADER = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aHalo;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vHalo;

  void main() {
    vColor = aColor;
    vHalo = aHalo;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    // 呼吸脉冲：各节点相位错开，整体呈现星尘明灭
    float pulse = 1.0 + 0.12 * sin(uTime * 1.8 + aPhase);
    gl_PointSize = aSize * uPixelRatio * pulse * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

/** 片元着色器：软核光斑 + 边缘光晕，里程碑月份叠加金色光环 */
const FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vColor;
  varying float vHalo;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;
    // 亮核 + 柔和晕圈
    float core = smoothstep(0.18, 0.0, d);
    float halo = smoothstep(0.5, 0.1, d);
    float alpha = core + halo * 0.35;
    // 里程碑月份：由内向外混入金色 #FFAA00
    vec3 gold = vec3(1.0, 0.667, 0.0);
    vec3 color = mix(vColor, gold, vHalo * halo * 0.8);
    gl_FragColor = vec4(color, alpha);
  }
`;

/** 拾取阈值（世界单位）：全局层用 Points 阈值拾取，避免全量遍历；隧道纵深下远端节点也需要可点 */
const PICK_THRESHOLD = 0.55;
/** 判定点击的最大位移（像素），区分拖动旋转与点击 */
const TAP_SLOP_PX = 6;

interface IProps {
  /** 月份簇数组（时间正序） */
  clusters: IMonthCluster[];
  /** 当前聚焦月份（选中节点高亮脉冲加速） */
  focusedMonth: string | null;
  /** 点击月份节点回调 */
  onSelectMonth: (month: string) => void;
}

/** 全局层月份簇：THREE.Points 单 draw call，节点数 = 月份数 */
function ClusterPoints(props: IProps) {
  const { clusters, onSelectMonth } = props;
  const { raycaster, size } = useThree();
  // 指针按下位置（区分拖动与点击）
  const downPosRef = useRef({ x: 0, y: 0 });

  // 几何体与材质：命令式创建，卸载时统一 dispose
  const { geometry, material } = useMemo(() => {
    const count = clusters.length;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const halos = new Float32Array(count);
    const color = new THREE.Color();

    clusters.forEach((cluster, index) => {
      positions.set(cluster.position, index * 3);
      color.set(cluster.color);
      colors.set([color.r, color.g, color.b], index * 3);
      sizes[index] = getClusterNodeSize(cluster.count) * 10;
      phases[index] = (index * 0.7) % (Math.PI * 2);
      halos[index] = cluster.hasMilestone ? 1 : 0;
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute("aHalo", new THREE.BufferAttribute(halos, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry, material };
  }, [clusters]);

  // 卸载红线：dispose 几何体与材质
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  // 阈值拾取：调大 Points 射线命中范围，并同步像素比 uniform
  useEffect(() => {
    if (raycaster.params.Points) {
      raycaster.params.Points.threshold = PICK_THRESHOLD;
    }
  }, [raycaster]);

  // 帧驱动：时间 uniform 更新呼吸脉冲
  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.getElapsedTime();
  });

  // 窗口尺寸变化时同步像素比，保证节点清晰度
  useEffect(() => {
    material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
  }, [material, size]);

  /** 点击月份节点：拖动超过阈值视为旋转，不触发选择 */
  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    downPosRef.current = {
      x: event.nativeEvent.clientX,
      y: event.nativeEvent.clientY,
    };
  };

  /** 松开手指：判断是否点击 */
  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    const { x, y } = downPosRef.current;
    const dx = event.nativeEvent.clientX - x;
    const dy = event.nativeEvent.clientY - y;
    if (Math.hypot(dx, dy) > TAP_SLOP_PX) return;
    // index 即命中的节点序号，对应时间正序的月份簇
    if (typeof event.index === "number") {
      const cluster = clusters[event.index];
      if (cluster) onSelectMonth(cluster.month);
    }
  };

  // 悬停指针样式
  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  // 移出指针样式
  const handlePointerOut = () => {
    document.body.style.cursor = "auto";
  };

  return (
    <points
      geometry={geometry}
      material={material}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}

export default ClusterPoints;
