// 导入 hooks
import { useMemo } from "react";
// 导入 three 与 drei 加粗线
import * as THREE from "three";
import { Line } from "@react-three/drei";
// 导入月份簇类型、隧道两端颜色与配置
import type { IMonthCluster } from "../../types";
import {
  TUNNEL_START_COLOR,
  TUNNEL_END_COLOR,
  TUNNEL_CONFIG,
} from "../../types";

/** 圆环采样段数 */
const SEGMENTS = 64;

/** 月份发光环圈：每簇一个隧道横截面圆环，深处蓝洞口粉，当前月为洞口高亮环 */
function MonthRings(props: { clusters: IMonthCluster[] }) {
  const { clusters } = props;

  const rings = useMemo(() => {
    // 开始颜色
    const colorStart = new THREE.Color(TUNNEL_START_COLOR);
    // 结束颜色
    const colorEnd = new THREE.Color(TUNNEL_END_COLOR);
    // 颜色 vector3(1,1,1) 白色
    const color = new THREE.Color();
    // 隧道半径
    const { radius } = TUNNEL_CONFIG;

    return clusters.map((cluster, index) => {
      // 与 groupByMonth 一致的时间比例：0 = 出生月深处，1 = 当前月洞口
      const t = clusters.length > 1 ? index / (clusters.length - 1) : 0.5;
      // 颜色插值
      color.copy(colorStart).lerp(colorEnd, t);
      // 点数组
      const points: [number, number, number][] = [];
      // 颜色数组
      const colors: [number, number, number][] = [];
      // 生成点数据和颜色数据
      for (let s = 0; s <= SEGMENTS; s++) {
        const angle = (s / SEGMENTS) * Math.PI * 2;
        points.push([
          Number((radius * Math.cos(angle)).toFixed(4)),
          Number((radius * Math.sin(angle)).toFixed(4)),
          cluster.position[2],
        ]);
        colors.push([color.r, color.g, color.b]);
      }
      // 最后一簇 = 当前月，作为洞口环加亮
      const isCurrent = index === clusters.length - 1;
      return { key: cluster.month, points, colors, isCurrent };
    });
  }, [clusters]);

  return (
    <group>
      {rings.map((ring) => (
        <Line
          key={ring.key}
          points={ring.points}
          vertexColors={ring.colors}
          lineWidth={ring.isCurrent ? 2.5 : 1.8}
          transparent
          opacity={ring.isCurrent ? 0.95 : 0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      ))}
    </group>
  );
}

export default MonthRings;
