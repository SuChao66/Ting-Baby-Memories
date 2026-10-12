// 导入 hooks
import { useMemo, useState } from "react";
// 导入路由
import { useNavigate } from "react-router-dom";
// 导入样式
import { CapsuleContainer, CanvasWrap, BackButton, BackArrow } from "./styles";
// 导入数据层 Hook：全量接口优先，失败降级分页拉取
import { useCapsuleData } from "./useCapsuleData";
// 导入数据聚合：记录数组 → 月份簇
import { groupByMonth } from "./utils";
// 导入月内胶囊类型
import type { ICapsuleData } from "./types";
// 导入状态组件
import CapsuleLoading from "./components/CapsuleLoading/index";
import CapsuleEmpty from "./components/CapsuleEmpty/index";
import CapsuleDetail from "./components/CapsuleDetail/index";
// 导入 3D 场景
import Scene from "./components/Scene/index";
import { Canvas } from "@react-three/fiber";

interface IProps {
  babyId: string;
}

function TimeCapsule3D(props: IProps) {
  const { babyId } = props;
  const navigate = useNavigate();
  // 数据层：加载进度、精简记录、失败标记与重试
  const { loading, progress, items, error, retry } = useCapsuleData(babyId);
  // 聚焦月份：状态提升，Scene 飞入/返回共用
  const [focusedMonth, setFocusedMonth] = useState<string | null>(null);
  // 选中的月内胶囊：驱动摘要卡片
  const [selectedCapsule, setSelectedCapsule] = useState<ICapsuleData | null>(
    null,
  );

  // 按月聚合：月份簇驱动全局视图（节点数 = 月份数，与记录数解耦）
  // useMemo: 缓存计算结果，避免每次渲染都重新执行开销较大的计算
  const { clusters } = useMemo(() => groupByMonth(items), [items]);

  /** 返回全景：清空聚焦月份与摘要卡片 */
  const handleBackToGlobal = () => {
    setFocusedMonth(null);
    setSelectedCapsule(null);
  };

  return (
    <CapsuleContainer>
      {loading ? (
        // 加载态：遮罩下不挂载 Canvas，避免空数据渲染
        <CapsuleLoading progress={progress} />
      ) : items.length === 0 ? (
        // 空态：无记录引导（去记录）/ 加载失败重试
        <CapsuleEmpty
          error={error}
          onRetry={retry}
          onAdd={() => navigate("/add-timeline")}
        />
      ) : (
        // 就绪态：挂载 3D 场景
        <CanvasWrap>
          {/* alpha 开启透明背景，露出外层深空渐变 */}
          <Canvas
            gl={{ alpha: true }}
            camera={{ position: [0, 5.5, 14.5], fov: 60 }}
          >
            <Scene
              clusters={clusters}
              focusedMonth={focusedMonth}
              onSelectMonth={setFocusedMonth}
              onPickCapsule={setSelectedCapsule}
            />
          </Canvas>
          {/* 月内视图：返回全景按钮（卡片打开时隐藏避免重叠） */}
          {focusedMonth && !selectedCapsule && (
            <BackButton onClick={handleBackToGlobal}>
              <BackArrow>‹</BackArrow>
              返回全景
            </BackButton>
          )}
          {/* 胶囊摘要卡片：底部滑出 */}
          {selectedCapsule && (
            <CapsuleDetail
              capsule={selectedCapsule}
              onClose={() => setSelectedCapsule(null)}
            />
          )}
        </CanvasWrap>
      )}
    </CapsuleContainer>
  );
}

export default TimeCapsule3D;
