import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
// 导入组件
import NavHeader from "@/components/navHeader";
import RecordCard from "./components/RecordCard";
import Empty from "./components/Empty";
import AddHeightWeight from "./components/AddHeightWeight";
import GrowthChart from "./components/GrowthChart";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
// 导入样式
import {
  HeightWeightContainer,
  AddBtn,
  TabBar,
  TabItem,
  RecordList,
  ChartWrap,
} from "./styles";
// 导入常量
import type { TabKey } from "./constants";
import { TABS } from "./constants";
import { getStandardData, calcMonthAge, interpStd } from "@/enums";
import type { IStdRangePoint } from "./components/GrowthChart";
// 导入store
import { useHeightWeightStore, useBabyStore } from "@/store";
// 导入类型
import type { IHeightWeightItem } from "@/interface/heightWeight";
import type { IBabyItem } from "@/interface/baby";

/** 图表页签配置 */
const CHART_CONFIG: Record<
  Exclude<TabKey, "record">,
  {
    title: string;
    yAxisName: string;
    color: string;
    field: "height" | "weight" | "head";
  }
> = {
  height: {
    title: "身高曲线",
    yAxisName: "身高(cm)",
    color: "#ff6b8a",
    field: "height",
  },
  weight: {
    title: "体重曲线",
    yAxisName: "体重(kg)",
    color: "#3b82f6",
    field: "weight",
  },
  head: {
    title: "头围曲线",
    yAxisName: "头围(cm)",
    color: "#10b981",
    field: "head",
  },
};

/** 从记录列表中提取指定字段的曲线数据，按日期升序排列 */
function extractChartData(
  records: IHeightWeightItem[],
  field: "height" | "weight" | "head",
): { date: string; value: number }[] {
  return records
    .filter((r) => r[field] != null)
    .map((r) => ({ date: r.date.split("T")[0], value: r[field]! }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** 构建标准范围数据：按宝宝每条记录的日期，计算月龄对应的上下限 */
function buildStdRange(
  babyData: { date: string; value: number }[],
  gender: number | null | undefined,
  birthday: string | Date | null | undefined,
  field: "height" | "weight" | "head",
): IStdRangePoint[] {
  // 头围暂无标准对照数据
  if (field === "head" || !babyData.length || birthday == null) return [];
  const birthStr =
    birthday instanceof Date ? birthday.toISOString() : String(birthday);
  const stdData = getStandardData(gender as 0 | 1 | null, field);
  return babyData.map((d) => {
    const monthAge = calcMonthAge(birthStr, d.date);
    const range = interpStd(stdData, monthAge);
    return {
      label: d.date.split("T")[0],
      low: range?.low ?? 0,
      high: range?.high ?? 0,
    };
  });
}

/** 格式化日期为 YYYY/M/D */
function formatLabel(date: string): string {
  const [y, m, d] = date.split("T")[0].split("-").map(Number);
  return `${y}/${m}/${d}`;
}

function HeightWeight() {
  // babyId
  const { id } = useParams();

  const { searchHeightWeight, deleteHeightWeight } = useHeightWeightStore(
    (state) => state,
  );
  const { getBabyInfo } = useBabyStore((state) => state);

  // 当前页签
  const [activeTab, setActiveTab] = useState<TabKey>("record");
  // 记录列表数据
  const [recordList, setRecordList] = useState<IHeightWeightItem[]>([]);
  // 宝宝信息
  const [babyInfo, setBabyInfo] = useState<IBabyItem | null>(null);
  // 新增/编辑记录弹窗显示
  const [addVisible, setAddVisible] = useState(false);
  // 当前编辑记录
  const [editRecord, setEditRecord] = useState<IHeightWeightItem | undefined>(
    undefined,
  );

  useEffect(() => {
    getData();
    getBabyData();
  }, []);

  // 获取记录数据
  const getData = async () => {
    if (!id) return;
    const res = await searchHeightWeight({ babyId: id });
    setRecordList(res?.list);
  };

  // 获取宝宝信息（性别 + 生日）
  const getBabyData = async () => {
    if (!id) return;
    const data = await getBabyInfo({ id });
    setBabyInfo(data ?? null);
  };

  // 提取各字段曲线数据（按日期升序）
  const heightData = useMemo(
    () => extractChartData(recordList, "height"),
    [recordList],
  );
  const weightData = useMemo(
    () => extractChartData(recordList, "weight"),
    [recordList],
  );
  const headData = useMemo(
    () => extractChartData(recordList, "head"),
    [recordList],
  );

  // 当前页签的曲线数据
  const currentChartData =
    activeTab === "height"
      ? heightData
      : activeTab === "weight"
        ? weightData
        : activeTab === "head"
          ? headData
          : [];

  // 当前页签的标准范围（头围无标准数据，只有身高和体重有）
  const currentStdRange = useMemo(() => {
    if (activeTab === "record") return undefined;
    const config = CHART_CONFIG[activeTab];
    if (config.field === "head") return undefined; // 头围暂无标准对照
    return buildStdRange(
      currentChartData,
      babyInfo?.gender,
      babyInfo?.birthday,
      config.field,
    );
  }, [activeTab, currentChartData, babyInfo]);

  // 当前页签的图表标签（X 轴统一用 YYYY/M/D 格式）
  const chartDataWithLabels = useMemo(
    () =>
      currentChartData.map((d) => ({
        date: formatLabel(d.date),
        value: d.value,
      })),
    [currentChartData],
  );
  const stdRangeWithLabels = useMemo(
    () =>
      currentStdRange?.map((s) => ({
        ...s,
        label: formatLabel(s.label),
      })),
    [currentStdRange],
  );

  // 打开新增弹窗
  const handleAdd = () => {
    setEditRecord(undefined);
    setAddVisible(true);
  };

  // 打开编辑弹窗
  const handleEdit = (record: IHeightWeightItem) => {
    setEditRecord(record);
    setAddVisible(true);
  };

  // 删除记录
  const handleDelete = async (record: IHeightWeightItem) => {
    const ok = await deleteHeightWeight(record._id);
    if (ok) {
      Toast.show({ title: "删除成功" });
      getData();
    }
  };

  // 关闭弹窗
  const handleClose = () => {
    setAddVisible(false);
    setEditRecord(undefined);
  };

  return (
    <>
      <NavHeader
        title="身高体重记录"
        back={<IoIosArrowBack size={22} />}
        right={<AddBtn onClick={handleAdd}>添加</AddBtn>}
      />
      <HeightWeightContainer>
        {/* 页签切换：记录列表 / 身高曲线 / 体重曲线 / 头围曲线 */}
        <TabBar>
          {TABS.map((tab) => (
            <TabItem
              key={tab.key}
              $active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </TabItem>
          ))}
        </TabBar>
        {activeTab === "record" ? (
          recordList.length > 0 ? (
            <RecordList>
              {recordList.map((record) => (
                <RecordCard
                  key={record._id}
                  record={record}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </RecordList>
          ) : (
            // 未添加任何记录时的兜底展示
            <Empty />
          )
        ) : currentChartData.length > 0 ? (
          <ChartWrap>
            <GrowthChart
              title={CHART_CONFIG[activeTab].title}
              yAxisName={CHART_CONFIG[activeTab].yAxisName}
              data={chartDataWithLabels}
              color={CHART_CONFIG[activeTab].color}
              stdRange={stdRangeWithLabels}
            />
          </ChartWrap>
        ) : (
          <Empty
            tip={`暂无${CHART_CONFIG[activeTab].title}数据`}
            guide={false}
          />
        )}
      </HeightWeightContainer>

      {/* 新增/编辑身高体重弹窗 */}
      <AddHeightWeight
        visible={addVisible}
        babyId={id ?? ""}
        currentRecord={editRecord}
        onClose={handleClose}
        onGetData={getData}
      />
    </>
  );
}

export default HeightWeight;
