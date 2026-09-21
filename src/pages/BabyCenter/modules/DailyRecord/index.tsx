import { useState, useRef, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
// 导入组件
import NavHeader from "@/components/navHeader";
// 导入图标
import { IoIosArrowBack, IoIosArrowUp } from "react-icons/io";
// 导入样式
import {
  DailyRecordContainer,
  DailyRecordList,
  BottomActionBar,
  ActionGrid,
  ActionItem,
  ActionIconWrap,
  ActionLabel,
  CollapseBtn,
} from "./styles";
// 导入组件
import Empty from "@/baseUI/empty";
import AddCommonRecord from "./components/AddCommonRecord";
import AddDiaperRecord from "./components/AddDiaperRecord";
import AddFeedRecord from "./components/AddFeedRecord";
// 导入工具函数
import { vw } from "@/utils";
// 导入类型
import type { DailyRecordType } from "@/types";
// 导入常量
import { DAILY_RECORD_TYPES } from "@/enums";
// 导入操作按钮配置
import { actionList, COMMON_DAIYL_RECORD_TYPE } from "./actionConfig";

function DailyRecord() {
  const { id } = useParams();

  const [recordList] = useState([]);
  // 是否收起操作按钮
  const [collapsed, setCollapsed] = useState(false);
  // 底部操作栏ref
  const bottomActionRef = useRef<HTMLDivElement>(null);
  // 底部操作栏的高度
  const [height, setHeight] = useState(0);
  // 是否显示公共类型弹框
  const [visible, setVisible] = useState(false);
  // 是否显示换尿布类型弹框
  const [diaperVisible, setDiaperVisible] = useState(false);
  // 是否显示喂奶类型弹框
  const [feedVisible, setFeedVisible] = useState(false);
  // 当前公共类型
  const [type, setType] = useState("");

  useLayoutEffect(() => {
    // 获取底部区域高度
    if (bottomActionRef.current) {
      setHeight(bottomActionRef.current.offsetHeight);
    }
  }, [collapsed]);

  // 点击操作按钮
  const handleActionClick = (key: DailyRecordType) => {
    // 设置当前操作类型
    setType(key);
    if (COMMON_DAIYL_RECORD_TYPE.includes(key)) {
      setVisible(true);
    } else if (key === DAILY_RECORD_TYPES.DIAPER) {
      setDiaperVisible(true);
    } else if (key === DAILY_RECORD_TYPES.FEED) {
      setFeedVisible(true);
    }
  };

  return (
    <>
      <DailyRecordContainer>
        <NavHeader title="吃喝拉撒睡" back={<IoIosArrowBack size={22} />} />
        <DailyRecordList $height={height}>
          {!recordList.length && <Empty text="暂无数据" />}
        </DailyRecordList>
        {/* 底部操作按钮 */}
        <BottomActionBar ref={bottomActionRef}>
          {!collapsed && (
            <ActionGrid>
              {actionList.map((item) => (
                <ActionItem
                  key={item.key}
                  onClick={() => handleActionClick(item.key)}
                >
                  <ActionIconWrap $gradient={item.gradient}>
                    {item.icon}
                  </ActionIconWrap>
                  <ActionLabel>{item.label}</ActionLabel>
                </ActionItem>
              ))}
            </ActionGrid>
          )}
          <CollapseBtn
            onClick={() => setCollapsed(!collapsed)}
            $collapsed={collapsed}
          >
            <IoIosArrowUp size={vw(20)} color="#999" className="triggle" />
          </CollapseBtn>
        </BottomActionBar>
      </DailyRecordContainer>

      {/* 新增 洗澡、睡眠、玩耍、游泳、辅食、其他事件 5种公共类型记录 */}
      {visible && (
        <AddCommonRecord
          visible={visible}
          type={type}
          babyId={id}
          onClose={() => setVisible(false)}
        />
      )}

      {/* 新增换尿布类型记录 */}
      {diaperVisible && (
        <AddDiaperRecord
          visible={diaperVisible}
          type={type}
          babyId={id}
          onClose={() => setDiaperVisible(false)}
        />
      )}

      {/* 喂奶类型记录 */}
      {feedVisible && (
        <AddFeedRecord
          visible={feedVisible}
          type={type}
          babyId={id}
          onClose={() => setFeedVisible(false)}
        />
      )}
    </>
  );
}

export default DailyRecord;
