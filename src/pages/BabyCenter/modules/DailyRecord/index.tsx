import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useParams } from "react-router-dom";
// 导入组件
import NavHeader from "@/components/navHeader";
// 导入图标
import { IoIosArrowBack, IoIosArrowUp } from "react-icons/io";
import { IoFunnelOutline } from "react-icons/io5";
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
  FilterEntryBtn,
} from "./styles";
// 导入组件
import Empty from "@/baseUI/empty";
import AddCommonRecord from "./components/AddCommonRecord";
import AddDiaperRecord from "./components/AddDiaperRecord";
import AddFeedRecord from "./components/AddFeedRecord";
// 导入工具函数
import { vw, formatDay } from "@/utils";
// 导入类型
import type { DailyRecordType } from "@/types";
import type { IGetDailyRecordItem } from "@/interface/dailyRecord";
// 导入常量
import { DAILY_RECORD_TYPES } from "@/enums";
// 导入操作按钮配置
import { actionList, COMMON_DAIYL_RECORD_TYPE } from "./actionConfig";
// 导入store
import { useDailyRecordStore } from "@/store";
// 导入组件
import FilterBar from "./components/FilterBar";
import RecordList from "./components/RecordList";

function DailyRecord() {
  const { id } = useParams();

  // 查询列表方法
  const searchDailyRecord = useDailyRecordStore(
    (state) => state.searchDailyRecord,
  );

  // 日期
  const [filterDate, setFilterDate] = useState<Date>(new Date());
  // 筛选类型（"" 表示全部类型）
  const [filterType, setFilterType] = useState<DailyRecordType | "">("");
  // 列表内容
  const [recordList, setRecordList] = useState<IGetDailyRecordItem[]>([]);
  // 是否收起操作按钮
  const [collapsed, setCollapsed] = useState(true);
  // 是否显示筛选区（默认隐藏，点击导航栏筛选入口展开）
  const [filterVisible, setFilterVisible] = useState(false);
  // 底部操作栏ref
  const bottomActionRef = useRef<HTMLDivElement>(null);
  // 搜索区ref
  const filterBarRef = useRef(null);
  // 底部操作栏的高度
  const [height, setHeight] = useState(0);
  // 顶部搜索区域的高度
  const [filterBarHeight, setFilterBarHeight] = useState(0);
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

  useLayoutEffect(() => {
    if (filterBarRef.current) {
      setFilterBarHeight(filterBarRef.current.offsetHeight)
    } else {
      setFilterBarHeight(0)
    }
  }, [filterVisible])

  useEffect(() => {
    // 获取列表
    getData();
  }, [filterType, filterDate]);

  // 获取日常记录内容
  const getData = async () => {
    const params = {
      babyId: id,
      // 格式化为 YYYY-MM-DD 本地日期字符串，避免 Date 序列化为 UTC 后差一天
      date: formatDay(filterDate),
      type: filterType,
    };
    const data = await searchDailyRecord(params);
    setRecordList(data?.list ?? []);
  };

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
        <NavHeader
          title="吃喝拉撒睡"
          back={<IoIosArrowBack size={22} />}
          right={
            <FilterEntryBtn
              $active={filterVisible}
              onClick={() => setFilterVisible(!filterVisible)}
            >
              <IoFunnelOutline size={vw(16)} color="currentColor" />
            </FilterEntryBtn>
          }
        />

        {/* 筛选栏：支持按类型、按日期筛选（点击导航栏筛选入口展开/收起） */}
        {filterVisible && (
          <FilterBar
            ref={filterBarRef}
            filterType={filterType}
            filterDate={filterDate}
            setFilterType={setFilterType}
            setFilterDate={setFilterDate}
          />
        )}

        {/* 列表展示 */}
        <DailyRecordList $height={height} $filterBarHeight={filterBarHeight}>
          {!recordList?.length ? <Empty text="暂无数据" /> : (
            <RecordList list={recordList} />
          )}
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
