// 导入首页样式组件
import { useState } from "react";
import { HomeContainer } from "./styles";
// 导入空状态组件
import Empty from "@/baseUI/empty";

export default function Home() {
  // 记录列表
  const [records] = useState([]);

  return (
    <HomeContainer>
      {records.length === 0 ? <Empty text="暂无记录" /> : "home"}
    </HomeContainer>
  );
}
