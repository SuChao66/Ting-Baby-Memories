// 导入月份簇类型
import type { IMonthCluster } from "../../types";
// 导入子组件
import Starfield from "./Starfield";
import TunnelTrack from "./TunnelTrack";
import MonthRings from "./MonthRings";
import ClusterPoints from "./ClusterPoints";

interface IProps {
  /** 月份簇数组（时间正序） */
  clusters: IMonthCluster[];
  /** 当前聚焦月份 */
  focusedMonth: string | null;
  /** 点击月份节点回调 */
  onSelectMonth: (month: string) => void;
}

/** 全局视图层：星空 + 时光隧道（壁光带 + 月份环圈 + 簇节点） */
function MonthClusters(props: IProps) {
  const { clusters, focusedMonth, onSelectMonth } = props;

  return (
    <group>
      {/* 星空背景与漂浮微尘 */}
      <Starfield />
      {/* 隧道壁双螺旋光带：深处蓝 → 洞口粉 */}
      <TunnelTrack />
      {/* 月份发光环圈：每簇一个隧道横截面，当前月为洞口高亮环 */}
      <MonthRings clusters={clusters} />
      {/* 月份簇发光节点（单 Points，阈值拾取） */}
      <ClusterPoints
        clusters={clusters}
        focusedMonth={focusedMonth}
        onSelectMonth={onSelectMonth}
      />
    </group>
  );
}

export default MonthClusters;
