import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useParams } from "react-router-dom";
// 导入组件
import NavHeader from "@/components/navHeader";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
import { IoFunnelOutline } from "react-icons/io5";
// 导入样式
import { SymptomContainer, SymptomList, FilterEntryBtn } from "./styles";
// 导入组件
import Empty from "@/baseUI/empty";
import BottomAction from "./components/BottomAction";
import AddSymptomRecord from "./components/AddSymptomRecord";
import RecordList from "./components/RecordList";
import FilterBar from "./components/FilterBar";
// 导入工具函数
import { vw, formatDay } from "@/utils";
// 导入类型
import type { SymptomRecordType } from "@/types";
import type { IGetSymptomRecordItem } from "@/interface/symptom";
// 导入常量
import { SYMPTOM_RECORD_TYPES } from "@/enums";
// 导入store
import { useSymptomStore } from "@/store";

function Symptom() {
  const { id } = useParams();

  // 查询、删除方法
  const { searchSymptomRecord, deleteSymptomRecord } = useSymptomStore(
    (state) => state,
  );

  // 筛选日期
  const [filterDate, setFilterDate] = useState<Date>(new Date());
  // 筛选类型（"" 表示全部类型）
  const [filterType, setFilterType] = useState<SymptomRecordType | "">("");
  // 列表内容
  const [recordList, setRecordList] = useState<IGetSymptomRecordItem[]>([]);
  // 是否收起操作按钮
  const [collapsed, setCollapsed] = useState(recordList.length !== 0);
  // 底部操作栏ref
  const bottomActionRef = useRef<HTMLDivElement>(null);
  // 底部操作栏的高度
  const [height, setHeight] = useState(0);
  // 是否显示筛选区（默认隐藏，点击导航栏筛选入口展开）
  const [filterVisible, setFilterVisible] = useState(false);
  // 筛选区ref
  const filterBarRef = useRef<HTMLDivElement>(null);
  // 顶部筛选区域的高度
  const [filterBarHeight, setFilterBarHeight] = useState(0);
  // 是否显示新增/编辑弹框
  const [visible, setVisible] = useState(false);
  // 当前操作类型
  const [type, setType] = useState<SymptomRecordType>(
    SYMPTOM_RECORD_TYPES.TEMPERATURE,
  );
  // 当前编辑的记录
  const [currentRecord, setCurrentRecord] =
    useState<IGetSymptomRecordItem | null>(null);

  useLayoutEffect(() => {
    // 获取底部区域高度
    if (bottomActionRef.current) {
      setHeight(bottomActionRef.current.offsetHeight);
    }
  }, [collapsed]);

  useLayoutEffect(() => {
    if (filterBarRef.current) {
      setFilterBarHeight(filterBarRef.current.offsetHeight);
    } else {
      setFilterBarHeight(0);
    }
  }, [filterVisible]);

  useEffect(() => {
    // 获取列表
    getData();
  }, [filterType, filterDate]);

  // 获取症状护理记录（按天查询当天全部类型）
  const getData = async () => {
    // 路由参数 id 理论上必传，兜底为空字符串
    const babyId = id ?? "";
    const params = {
      babyId,
      // 格式化为 YYYY-MM-DD 本地日期字符串，避免 Date 序列化为 UTC 后差一天
      date: formatDay(filterDate),
      // "" 表示全部类型，转为 undefined 不筛选
      type: filterType || undefined,
    };
    const data = await searchSymptomRecord(params);
    setRecordList(data?.list ?? []);
  };

  // 点击底部操作按钮
  const handleActionClick = (key: SymptomRecordType) => {
    setType(key);
    setVisible(true);
  };

  // 删除当前记录
  const handleDeleteRecord = async (item: IGetSymptomRecordItem) => {
    if (!item._id) return;
    const ok = await deleteSymptomRecord(item._id);
    if (ok) {
      Toast.show({ content: "删除成功" });
      getData();
    }
  };

  // 编辑记录
  const handleEditRecord = (item: IGetSymptomRecordItem) => {
    setCurrentRecord(item);
    setType(item.type as SymptomRecordType);
    setVisible(true);
  };

  return (
    <>
      <SymptomContainer>
        <NavHeader
          title="症状护理"
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
        <SymptomList $height={height} $filterBarHeight={filterBarHeight}>
          {!recordList?.length ? (
            <Empty text="今日暂无相关记录，请添加～" />
          ) : (
            <RecordList
              list={recordList}
              onDelete={(item) => handleDeleteRecord(item)}
              onEdit={(item) => handleEditRecord(item)}
            />
          )}
        </SymptomList>

        {/* 底部操作按钮（支持展开/收起） */}
        <BottomAction
          ref={bottomActionRef}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onActionClick={handleActionClick}
        />
      </SymptomContainer>

      {/* 新增/编辑 体温、症状、用药、看医生、备忘 5种类型记录 */}
      {visible && (
        <AddSymptomRecord
          visible={visible}
          type={type}
          babyId={id ?? ""}
          currentRecord={currentRecord}
          onClose={() => setVisible(false)}
          onGetData={getData}
        />
      )}
    </>
  );
}

export default Symptom;
