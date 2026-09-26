import { useEffect, useRef } from "react";
// 导入 echarts 核心模块（按需引入，减小打包体积）
import * as echarts from "echarts/core";
import type { EChartsOption } from "echarts";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DataZoomComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
// 导入样式
import { ChartContainer } from "./styles";

// 注册 echarts 模块
echarts.use([
  LineChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DataZoomComponent,
  LegendComponent,
  CanvasRenderer,
]);

/** 宝宝数据点 */
export interface IBabyDataPoint {
  date: string;
  value: number;
}

/** 标准范围数据点（每个 X 轴位置对应一个上下限） */
export interface IStdRangePoint {
  label: string;
  low: number;
  high: number;
}

interface IProps {
  /** 图表标题，如"身高曲线" */
  title: string;
  /** Y 轴名称，如"身高(cm)" */
  yAxisName: string;
  /** 宝宝记录数据 */
  data: IBabyDataPoint[];
  /** 折线颜色 */
  color?: string;
  /** 标准范围数据（可选，传入时绘制阴影带对比） */
  stdRange?: IStdRangePoint[];
}

function GrowthChart(props: IProps) {
  const { title, yAxisName, data, color = "#ff6b8a", stdRange } = props;
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // 初始化图表
  useEffect(() => {
    if (!chartRef.current) return;
    chartInstance.current = echarts.init(chartRef.current);
    return () => {
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, []);

  // 数据更新时重新渲染
  useEffect(() => {
    const chart = chartInstance.current;
    if (!chart) return;

    // 宝宝数据 X 轴标签（data.date 已由父组件格式化为 YYYY/M/D）
    const babyLabels = data.map((d) => d.date);
    const babyValues = data.map((d) => d.value);

    // 合并 X 轴：宝宝数据点 + 标准数据点（去重排序）
    let xAxisLabels: string[] = [...babyLabels];
    if (stdRange && stdRange.length) {
      const set = new Set(xAxisLabels);
      stdRange.forEach((s) => set.add(s.label));
      xAxisLabels = Array.from(set).sort();
    }

    // 宝宝数值按 X 轴对齐（没有数据的位置为 null）
    const babyAligned = xAxisLabels.map(
      (label) => babyValues[babyLabels.indexOf(label)] ?? null,
    );

    // 标准上下限按 X 轴对齐
    const stdLowAligned: (number | null)[] = xAxisLabels.map((label) => {
      const p = stdRange?.find((s) => s.label === label);
      return p ? p.low : null;
    });
    const stdHighAligned: (number | null)[] = xAxisLabels.map((label) => {
      const p = stdRange?.find((s) => s.label === label);
      return p ? p.high : null;
    });

    const hasStd = !!(stdRange && stdRange.length);

    const series: any[] = [];

    if (hasStd) {
      // 下限线（基准线，不单独显示，用于构成阴影）
      series.push({
        name: "标准下限",
        type: "line",
        data: stdLowAligned,
        smooth: true,
        symbol: "none",
        lineStyle: { width: 0 },
        stack: "std",
        silent: true,
      });
      // 上限-下限（阴影区间）
      series.push({
        name: "正常范围",
        type: "line",
        data: xAxisLabels.map((_, i) => {
          const lo = stdLowAligned[i];
          const hi = stdHighAligned[i];
          if (lo == null || hi == null) return null;
          return +(hi - lo).toFixed(1);
        }),
        smooth: true,
        symbol: "none",
        lineStyle: { width: 0, color: `${color}30` },
        areaStyle: { color: `${color}15` },
        itemStyle: { color: `${color}30` },
        stack: "std",
        z: 1,
      });
    }

    // 宝宝曲线
    series.push({
      name: "宝宝记录",
      type: "line",
      data: babyAligned,
      smooth: true,
      symbol: "circle",
      symbolSize: 7,
      lineStyle: { width: 2.5, color },
      itemStyle: { color, borderColor: "#fff", borderWidth: 1.5 },
      connectNulls: true,
      z: 3,
    });

    const option: EChartsOption = {
      title: {
        text: title,
        left: "center",
        textStyle: { fontSize: 14, fontWeight: 600, color: "#333" },
      },
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          let result = params[0]?.axisValue || "";
          params.forEach((p: any) => {
            if (p.value == null) return;
            if (p.seriesName === "宝宝记录") {
              result += `<br/>宝宝${yAxisName}: ${p.value}`;
            } else if (p.seriesName === "正常范围") {
              // 查找对应下限
              const idx = p.dataIndex;
              const lo = stdLowAligned[idx];
              const hi = stdHighAligned[idx];
              if (lo != null && hi != null)
                result += `<br/>正常范围: ${lo} ~ ${hi}`;
            }
          });
          return result;
        },
      },
      legend: {
        data: [
          { name: "正常范围", itemStyle: { color: `${color}30` } },
          { name: "宝宝记录", itemStyle: { color } },
        ],
        bottom: 0,
        textStyle: { fontSize: 11 },
        itemWidth: 16,
        itemHeight: 10,
      },
      grid: {
        left: "15%",
        right: "12%",
        top: "15%",
        bottom: "15%",
      },
      xAxis: {
        type: "category",
        data: xAxisLabels,
        boundaryGap: false,
        name: "日期",
        nameLocation: "end",
        nameGap: 5,
        nameTextStyle: { fontSize: 11, color: "#666" },
        axisLabel: {
          fontSize: 10,
          color: "#666",
        },
        axisLine: {
          show: true,
          lineStyle: { color: "#ccc", width: 1 },
        },
        axisTick: {
          show: true,
          lineStyle: { color: "#ccc" },
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: "value",
        name: yAxisName,
        nameLocation: "end",
        nameGap: 8,
        nameTextStyle: { fontSize: 11, color: "#666" },
        scale: true,
        axisLabel: {
          fontSize: 10,
          color: "#666",
        },
        axisLine: {
          show: true,
          lineStyle: { color: "#ccc", width: 1 },
        },
        axisTick: {
          show: true,
          lineStyle: { color: "#ccc" },
        },
        splitLine: {
          show: true,
          lineStyle: { color: "#f0f0f0", type: "dashed" },
        },
      },
      dataZoom: [{ type: "inside", start: 0, end: 100 }],
      series,
    };

    chart.setOption(option, true);
  }, [title, yAxisName, data, color, stdRange]);

  // 响应容器尺寸变化
  useEffect(() => {
    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <ChartContainer ref={chartRef} />;
}

export default GrowthChart;
