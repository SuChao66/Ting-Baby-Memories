import React from "react";
// 导入样式
import {
  BottomActionBar,
  ActionGrid,
  ActionItem,
  ActionIconWrap,
  ActionLabel,
  CollapseBtn,
} from "./styles";
// 导入图标
import { IoIosArrowUp } from "react-icons/io";
// 导入类型
import type { DailyRecordType } from "@/types";
// 导入操作按钮配置
import { actionList } from "../../actionConfig";
// 导入工具函数
import { vw } from "@/utils";

interface IProps {
  // 是否收起操作按钮（状态由父组件持有，父组件需感知变化以重新测量列表可用高度）
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  // 点击操作按钮（由父组件分发到对应类型的新增记录弹框）
  onActionClick: (key: DailyRecordType) => void;
}

function BottomAction(props: IProps, ref: React.Ref<HTMLDivElement>) {
  const { collapsed, setCollapsed, onActionClick } = props;

  return (
    <BottomActionBar ref={ref}>
      {/* 操作按钮网格（收起时隐藏） */}
      {!collapsed && (
        <ActionGrid>
          {actionList.map((item) => (
            <ActionItem key={item.key} onClick={() => onActionClick(item.key)}>
              <ActionIconWrap $gradient={item.gradient}>
                {item.icon}
              </ActionIconWrap>
              <ActionLabel>{item.label}</ActionLabel>
            </ActionItem>
          ))}
        </ActionGrid>
      )}
      {/* 展开/收起按钮 */}
      <CollapseBtn
        onClick={() => setCollapsed(!collapsed)}
        $collapsed={collapsed}
      >
        <IoIosArrowUp size={vw(20)} color="#999" className="triggle" />
      </CollapseBtn>
    </BottomActionBar>
  );
}

export default React.forwardRef<HTMLDivElement, IProps>(BottomAction);
