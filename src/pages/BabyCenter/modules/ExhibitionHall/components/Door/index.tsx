import { useState, useMemo, useEffect } from "react";
// 导入 fiber 帧循环与点击事件类型
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
// 导入Three
import * as THREE from "three";

interface IProps {
  year: number;
  position: Array<number>;
}

// 开门动作在整段动画（开门→关门）中的时间占比，按实际动画微调
const OPEN_RATIO = 0.5;

// 模型加载组件-门
function Door(props: IProps) {
  const { year, position } = props;
  console.log(year, position, "点击进入展厅，展示该年份的大事件");

  // 注意：路径必须是相对于 public 根目录的绝对路径
  // 动画剪辑在 gltf 解析结果上，不在 scene（Group）上，需单独解构
  const gltf = useGLTF("/models/door.glb", true);
  // 每个 Door 实例克隆一份场景：gltf.scene 是缓存的单例，同一 Object3D 只能有一个父节点，
  // 多实例共享会导致后挂载的门"抢走"先挂载的门，最终只显示一扇
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);
  // 每个实例独立的 AnimationMixer，直接绑定克隆体（已验证：克隆树按节点名绑定正常）
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);
  // 完整 clip 只有"开门→关门"一段：取第一个 clip 创建 action，用"暂停/倒放"拆成两段使用
  const action = useMemo(
    () => (gltf.animations[0] ? mixer.clipAction(gltf.animations[0]) : null),
    [mixer, gltf.animations],
  );
  // 卸载时停止动画并清理 mixer 缓存
  useEffect(() => {
    return () => {
      action?.stop();
      mixer.uncacheRoot(mixer.getRoot());
    };
  }, [mixer, action]);
  // 开门动作在完整 clip 中的时间占比
  const openTime = action ? action?.getClip().duration * OPEN_RATIO : 0;
  // 门是否处于"开"状态
  const [open, setOpen] = useState(false);

  // 初始停在 0 时刻（门关姿态），等待点击触发
  useEffect(() => {
    if (!action) return;
    // 重置
    action.reset();
    // 设置循环模式为1次
    action.setLoop(THREE.LoopOnce, 1);
    // 执行到"开门完成"点，自动结束
    action.clampWhenFinished = true;
    // 暂停
    action.paused = true;
    action.play();
  }, [action]);

  // 正向播放到达"开门完成"点时暂停；反向关门经过该点不拦截
  useFrame((_, delta) => {
    // 手动驱动 mixer（此前由 drei useAnimations 内部完成）
    mixer.update(delta);
    if (!action || action.paused || !action.enabled || action.timeScale <= 0)
      return;
    // 如果已经超过"开门完成"点，则暂停
    if (action.time >= openTime) {
      action.time = openTime;
      action.paused = true;
    }
  });

  // 点击门：开↔关。开门=正向播放，关门=反向倒放；中途再点立即反向
  const handleDoorClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    // 过滤漫游拖拽视角导致的误触
    if (e.delta > 5) return;
    if (!action) return;
    if (!open) {
      // LoopOnce 播完会自动 paused+disabled：已越过开门点则重置，从头正向开门
      if (action.time >= openTime) {
        action.reset();
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
      }
      action.enabled = true;
      action.paused = false;
      // 正向开门
      action.timeScale = 1;
    } else {
      // 关门：从当前时刻反向倒放，回到 0 时 LoopOnce 自动停
      action.enabled = true;
      action.paused = false;
      // 反向关门
      action.timeScale = -1;
    }
    action.play();
    // 设置开/关状态
    setOpen(!open);
  };

  return (
    <primitive
      object={scene}
      scale={1}
      rotation={[0, -Math.PI / 2, 0]}
      position={position}
      onClick={handleDoorClick}
    />
  );
}

export default Door;
