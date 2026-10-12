// 导入 hooks
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
// 导入 three 与 fiber
import * as THREE from "three";
// 导入hook
import { useFrame, type ThreeEvent } from "@react-three/fiber";
// 导入月内胶囊类型
import type { ICapsuleData } from "../../types";

/** 判定点击的最大位移（像素），区分拖动旋转与点击 */
const TAP_SLOP_PX = 6;

interface IProps {
  /** 当月胶囊数据（飞入月份的 capsules） */
  capsules: ICapsuleData[];
  /** 点击胶囊回调 */
  onPick: (capsule: ICapsuleData) => void;
}

/** 月内视图层：当月记录 InstancedMesh 胶囊（单 draw call，退出即销毁） */
function MonthCapsules(props: IProps) {
  const { capsules, onPick } = props;
  // 网格ref
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  // 指针按下位置（区分拖动与点击）
  const downPosRef = useRef({ x: 0, y: 0 });
  // 共享时间 uniform：注入材质 shader 后由 useFrame 驱动
  const uTime = useMemo(() => ({ value: 0 }), []);

  // 几何体与材质：单位球实例化，椭圆胶囊感由实例矩阵非均匀缩放实现
  const { geometry, material } = useMemo(() => {
    const geometry = new THREE.SphereGeometry(1, 24, 24);
    const material = new THREE.MeshStandardMaterial({
      roughness: 0.25,
      metalness: 0.1,
      transparent: true,
      opacity: 0.92,
      emissive: new THREE.Color("#ffffff"),
      emissiveIntensity: 0.05,
    });

    // 浮动动画注入 vertex shader：相位随 instanceId 错开，CPU 每帧零矩阵更新
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uTime;
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nuniform float uTime;")
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
          float floatPhase = float(gl_InstanceID) * 0.73;
          transformed.y += sin(uTime * 1.5 + floatPhase) * 0.06;
          transformed.x += cos(uTime * 1.1 + floatPhase) * 0.03;
          `,
        );
    };

    return { geometry, material };
  }, [uTime]);

  // 卸载红线：dispose 几何体与材质
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  // 构建实例矩阵与颜色（仅在飞入/退出时执行一次）
  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    capsules.forEach((capsule, index) => {
      dummy.position.set(...capsule.position);
      // 非均匀缩放：竖向拉长形成玻璃胶囊椭圆体
      dummy.scale.set(
        capsule.size * 1.15,
        capsule.size * 1.5,
        capsule.size * 1.15,
      );
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
      mesh.setColorAt(index, color.set(capsule.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
    mesh.computeBoundingSphere();
  }, [capsules]);

  // 帧驱动：更新浮动动画时间
  useFrame(({ clock }) => {
    uTime.value = clock.getElapsedTime();
  });

  /** 点击胶囊：拖动超过阈值视为旋转，不触发选中 */
  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    downPosRef.current = {
      x: event.nativeEvent.clientX,
      y: event.nativeEvent.clientY,
    };
  };

  /** 判断是否点击了胶囊 */
  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    const { x, y } = downPosRef.current;
    const dx = event.nativeEvent.clientX - x;
    const dy = event.nativeEvent.clientY - y;
    if (Math.hypot(dx, dy) > TAP_SLOP_PX) return;
    // instanceId 即当月实例序号，仅对当月实例 raycast
    if (typeof event.instanceId === "number") {
      const capsule = capsules[event.instanceId];
      if (capsule) onPick(capsule);
    }
  };

  // 悬停指针样式
  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  // 指针移出：恢复默认指针
  const handlePointerOut = () => {
    document.body.style.cursor = "auto";
  };

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, capsules.length]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}

export default MonthCapsules;
