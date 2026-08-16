// 导入工具函数
import { vw } from "@/utils";
// 导入空状态样式组件
import { EmptyContainer } from "./styles";

interface IProps {
  text: string;
}

function Empty(props: IProps) {
  return (
    <EmptyContainer>
      <SvgIcon name="empty" size={vw(128)} />
      <p className="text">{props.text || "暂无数据"}</p>
    </EmptyContainer>
  );
}

export default Empty;
