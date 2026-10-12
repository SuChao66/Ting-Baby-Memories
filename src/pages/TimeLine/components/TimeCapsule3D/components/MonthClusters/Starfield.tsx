// 导入 drei 星空与漂浮微尘
import { Sparkles, Stars } from "@react-three/drei";

/** 深空星空背景：远距离星海缓慢流动 + 金色时光微尘 */
function Starfield() {
  return (
    <group>
      {/* 星海：白噪音点阵，饱和度 0 保持深邃 */}
      <Stars
        radius={90}
        depth={50}
        count={4500}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      {/* 金色微尘：沿隧道纵深漂浮，时光穿行氛围 */}
      <Sparkles
        count={90}
        scale={[14, 14, 34]}
        size={2.2}
        speed={0.3}
        opacity={0.7}
        color="#FFD700"
      />
      {/* 蓝色微尘：深处冷色呼应 */}
      <Sparkles
        count={50}
        scale={[12, 12, 34]}
        size={1.8}
        speed={0.2}
        opacity={0.5}
        color="#64B5F6"
      />
    </group>
  );
}

export default Starfield;
