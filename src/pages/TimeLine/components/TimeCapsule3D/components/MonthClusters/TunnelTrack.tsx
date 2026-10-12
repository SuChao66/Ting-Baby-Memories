// 导入 hooks
import { useMemo } from "react";
// 导入 three 与 drei 加粗线
import * as THREE from "three";
import { Line } from "@react-three/drei";
// 导入隧道两端颜色与配置
import {
  TUNNEL_START_COLOR,
  TUNNEL_END_COLOR,
  TUNNEL_CONFIG,
} from "../../types";

/** 螺旋光带采样段数：足够平滑的隧道缠绕曲线 */
const SEGMENTS = 280;
/** 光带条数：两条相位互补，缠绕出隧道壁的流动感 */
const STRANDS = 2;

/** 隧道壁螺旋光带：沿轴缠绕的双色渐变光线，深处蓝洞口粉 */
function TunnelTrack() {
  const strands = useMemo(() => {
    // 开始颜色
    const colorStart = new THREE.Color(TUNNEL_START_COLOR);
    // 结束颜色
    const colorEnd = new THREE.Color(TUNNEL_END_COLOR);
    // 颜色 vector3(1,1,1) 白色
    const color = new THREE.Color();
    const { turns, radius, depth, startAngle } = TUNNEL_CONFIG;

    return Array.from({ length: STRANDS }, (_, strand) => {
      const phase = (strand / STRANDS) * Math.PI * 2;
      // 点个数数组
      const points: [number, number, number][] = [];
      // 对应的点颜色数组
      const colors: [number, number, number][] = [];
      // 生成点
      for (let i = 0; i <= SEGMENTS; i++) {
        const t = i / SEGMENTS;
        const angle = startAngle + t * turns * Math.PI * 2 + phase;
        points.push([
          Number((radius * Math.cos(angle)).toFixed(4)),
          Number((radius * Math.sin(angle)).toFixed(4)),
          Number((-depth * (1 - t)).toFixed(4)),
        ]);
        color.copy(colorStart).lerp(colorEnd, t);
        colors.push([color.r, color.g, color.b]);
      }
      return { key: strand, points, colors };
    });
  }, []);

  return (
    <group>
      {strands.map((strand) => (
        <group key={strand.key}>
          {/* 主光带：加粗渐变发光线 */}
          <Line
            points={strand.points}
            vertexColors={strand.colors}
            lineWidth={1.8}
            transparent
            opacity={0.62}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
          {/* 辅助微光：更粗更淡的包络，营造辉光层次 */}
          <Line
            points={strand.points}
            vertexColors={strand.colors}
            lineWidth={4}
            transparent
            opacity={0.14}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </group>
      ))}
    </group>
  );
}

export default TunnelTrack;
