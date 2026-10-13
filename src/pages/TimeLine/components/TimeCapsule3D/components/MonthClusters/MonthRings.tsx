// 导入 hooks
import { useMemo, useRef } from "react";
// 导入 three 与 fiber/drei 加粗线
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
// 导入月份簇类型、隧道两端颜色与配置
import type { IMonthCluster } from "../../types";
import {
  TUNNEL_START_COLOR,
  TUNNEL_END_COLOR,
  TUNNEL_CONFIG,
} from "../../types";

/** 隧道半径（内壁） */
const { radius } = TUNNEL_CONFIG;
/** 圆环采样段数 */
const SEGMENTS = 64;
/** 扫描弧采样段数与弧长（四分之一圆） */
const ARC_SEGMENTS = 20;
const ARC_SPAN = Math.PI * 0.5;
/** 隧道脊线数量：圆周均匀分布的轴向直线 */
const RIB_COUNT = 12;

/** 隧道插值色：0 = 出生端蓝，1 = 洞口端粉 */
function mixTunnelColor(t: number): THREE.Color {
  const start = new THREE.Color(TUNNEL_START_COLOR);
  const end = new THREE.Color(TUNNEL_END_COLOR);
  return start.lerp(end, t);
}

/** 隧道脊线数据：一条贯穿首尾环的轴向直线，顶点色沿深度渐变 */
interface IRibData {
  key: number;
  points: [number, number, number][];
  colors: [number, number, number][];
}

/** 隧道脊线：12 条贯穿首尾环的轴向直线，透视时向洞口收敛，撑起管状骨架 */
function TunnelRibs(props: { zStart: number; zEnd: number }) {
  const { zStart, zEnd } = props;

  const ribs = useMemo<IRibData[]>(() => {
    const start = new THREE.Color(TUNNEL_START_COLOR);
    const end = new THREE.Color(TUNNEL_END_COLOR);
    const list: IRibData[] = [];
    for (let i = 0; i < RIB_COUNT; i++) {
      // 角度偏移半个间隔：避开洞口节点落点，脊线与螺旋节点错开
      const angle = (i / RIB_COUNT) * Math.PI * 2 + Math.PI / RIB_COUNT;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      list.push({
        key: i,
        points: [
          [x, y, zStart],
          [x, y, zEnd],
        ],
        colors: [
          [start.r, start.g, start.b],
          [end.r, end.g, end.b],
        ],
      });
    }
    return list;
  }, [zStart, zEnd]);

  return (
    <group>
      {ribs.map((rib) => (
        <Line
          key={rib.key}
          points={rib.points}
          vertexColors={rib.colors}
          lineWidth={1}
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      ))}
    </group>
  );
}

/** 单个月份环数据：主环 + 扫描弧 + 动画参数 */
interface IRingData {
  key: string;
  /** 主环点集（圆心在隧道轴上） */
  points: [number, number, number][];
  /** 主环顶点色（沿深度渐变） */
  colors: [number, number, number][];
  /** 扫描弧点集 */
  arcPoints: [number, number, number][];
  /** 扫描弧颜色（环色向白提亮） */
  arcColor: THREE.Color;
  /** 基础透明度（深度衰减） */
  opacity: number;
  /** 扫描弧自转速度（rad/s，深处慢洞口快） */
  spin: number;
  /** 呼吸相位（逐环错开） */
  phase: number;
  /** 是否为洞口环（当前月） */
  isCurrent: boolean;
}

/** 月份环：静态发光圆环 + 旋转扫描弧 + 呼吸脉动（洞口环幅度最大） */
function MonthRing(props: { ring: IRingData }) {
  const { ring } = props;
  // 主环组：呼吸缩放
  const ringGroupRef = useRef<THREE.Group>(null);
  // 主环材质：呼吸亮度（drei Line 实例为 Line2，材质单挂）
  const ringMatRef = useRef<THREE.Material | null>(null);
  // 扫描弧组：周向流动
  const arcGroupRef = useRef<THREE.Group>(null);

  // 帧驱动：扫描弧沿隧道周向流动 + 环体呼吸脉动
  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime();
    if (arcGroupRef.current) {
      arcGroupRef.current.rotation.z -= ring.spin * delta;
    }
    if (ringMatRef.current) {
      ringMatRef.current.opacity = ring.isCurrent
        ? 0.82 + 0.18 * Math.sin(time * 2)
        : ring.opacity * (1 + 0.12 * Math.sin(time * 1.6 + ring.phase));
    }
    if (ring.isCurrent && ringGroupRef.current) {
      ringGroupRef.current.scale.setScalar(1 + 0.03 * Math.sin(time * 2));
    }
  });

  return (
    <group>
      {/* 主环：横截面，颜色与透明度沿深度渐变 */}
      <group ref={ringGroupRef}>
        <Line
          ref={(el) => {
            ringMatRef.current =
              (el as unknown as { material?: THREE.Material } | null)
                ?.material ?? null;
          }}
          points={ring.points}
          vertexColors={ring.colors}
          lineWidth={ring.isCurrent ? 2.5 : 1.8}
          transparent
          opacity={ring.opacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </group>
      {/* 扫描弧：亮段绕隧道轴旋转，像能量沿管壁流向洞口 */}
      <group ref={arcGroupRef}>
        <Line
          points={ring.arcPoints}
          color={ring.arcColor}
          lineWidth={2.2}
          transparent
          opacity={ring.isCurrent ? 0.85 : 0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </group>
    </group>
  );
}

/** 月份发光环圈：隧道横截面 + 轴向脊线骨架，深处蓝洞口粉，当前月为呼吸高亮洞口 */
function MonthRings(props: { clusters: IMonthCluster[] }) {
  const { clusters } = props;

  // 首尾环深度：脊线贯穿范围（月份不足两个时无轴向可言）
  const zStart = clusters[0]?.position[2] ?? 0;
  const zEnd = clusters[clusters.length - 1]?.position[2] ?? 0;

  const rings = useMemo<IRingData[]>(() => {
    return clusters.map((cluster, index) => {
      // 与 groupByMonth 一致的时间比例：0 = 出生月深处，1 = 当前月洞口
      const t = clusters.length > 1 ? index / (clusters.length - 1) : 0.5;
      const color = mixTunnelColor(t);

      // 主环点集与顶点色
      const points: [number, number, number][] = [];
      const colors: [number, number, number][] = [];
      for (let s = 0; s <= SEGMENTS; s++) {
        const angle = (s / SEGMENTS) * Math.PI * 2;
        points.push([
          radius * Math.cos(angle),
          radius * Math.sin(angle),
          cluster.position[2],
        ]);
        colors.push([color.r, color.g, color.b]);
      }

      // 扫描弧点集
      const arcPoints: [number, number, number][] = [];
      for (let s = 0; s <= ARC_SEGMENTS; s++) {
        const angle = (s / ARC_SEGMENTS) * ARC_SPAN;
        arcPoints.push([
          radius * Math.cos(angle),
          radius * Math.sin(angle),
          cluster.position[2],
        ]);
      }

      const isCurrent = index === clusters.length - 1;
      return {
        key: cluster.month,
        points,
        colors,
        arcPoints,
        // 扫描弧颜色：环色向白提亮 45%，叠加发光更醒目
        arcColor: color.clone().lerp(new THREE.Color("#FFFFFF"), 0.45),
        // 深度衰减：深处淡、洞口亮，当前月固定高亮
        opacity: isCurrent ? 0.95 : 0.2 + 0.32 * t,
        // 自转速度：深处慢洞口快，能量向洞口汇聚
        spin: 0.25 + t * 0.65,
        phase: index * 0.9,
        isCurrent,
      };
    });
  }, [clusters]);

  return (
    <group>
      {/* 轴向脊线骨架：撑起"管"的透视收敛感 */}
      {clusters.length > 1 && <TunnelRibs zStart={zStart} zEnd={zEnd} />}
      {/* 逐月横截面环 */}
      {rings.map((ring) => (
        <MonthRing key={ring.key} ring={ring} />
      ))}
    </group>
  );
}

export default MonthRings;
