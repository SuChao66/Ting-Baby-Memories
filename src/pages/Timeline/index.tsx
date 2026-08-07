// 导入 NutUI 组件
import { Cell } from "@nutui/nutui-react";

/** 成长时间线数据 */
const timelineData = [
  { title: "出生", description: "期待宝宝的到来" },
  { title: "满月", description: "记录满月时刻" },
  { title: "百天", description: "百天纪念" },
  { title: "周岁", description: "一周岁生日" },
];

export default function Timeline() {
  return (
    <div>
      <h1>成长时间线</h1>
      {timelineData.map((item) => (
        <Cell
          key={item.title}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
}
