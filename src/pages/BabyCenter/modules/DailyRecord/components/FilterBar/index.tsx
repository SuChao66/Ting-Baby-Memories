import React from "react";
import { useState } from "react";
// 导入样式
import {
  FilterBarContainer,
  FilterDateRow,
  FilterDateBtn,
  FilterResetBtn,
  FilterPrevDayBtn,
  FilterTypeScroll,
  FilterChip,
} from "./styles";
// 导入图标
import { IoIosCalendar } from "react-icons/io";
// 导入类型
import type { DailyRecordType } from "@/types";
import type { PickerOptions, PickerValue } from "@nutui/nutui-react";
// 导入配置
import { filterTypeOptions } from "../../actionConfig";
// 导入工具函数
import { vw } from "@/utils";
// 导入常量
import { ONE_DAY } from "@/enums";

interface IProps {
  // 筛选类型（"" 表示全部类型，状态由父组件持有，避免组件挂载时向父级同步触发重复查询）
  filterType: DailyRecordType | "";
  // 筛选日期（状态由父组件持有）
  filterDate: Date;
  setFilterType: (value: DailyRecordType | "") => void;
  setFilterDate: (value: Date) => void;
}

function FilterBar(props: IProps, ref: React.Ref<HTMLDivElement>) {
  const { filterType, filterDate, setFilterType, setFilterDate } = props;
  // 日期选择器显示状态（纯 UI 状态，保留在组件内部）
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  // 判断筛选日期是否为今天
  const isToday =
    filterDate.getFullYear() === new Date().getFullYear() &&
    filterDate.getMonth() === new Date().getMonth() &&
    filterDate.getDate() === new Date().getDate();

  // 是否显示后一天按钮
  const isShowNextDayBtn = filterDate.getDate() < new Date().getDate();

  // 选择筛选日期（一年前 ~ 今天）
  const handleDateConfirm = (
    _options: PickerOptions,
    values: PickerValue[],
  ) => {
    const [Y, M, D] = values.map(Number);
    if ([Y, M, D].some((v) => Number.isNaN(v))) return;
    setFilterDate(new Date(Y, M - 1, D));
    setDatePickerVisible(false);
  };

  // 设置日期为前一天日期
  const setPrevFilterDate = () => {
    const prevDate = new Date(filterDate.getTime() - ONE_DAY);
    setFilterDate(prevDate);
  };

  // 设置日期为后一天日期
  const setNextFilterDate = () => {
    const nextDate = new Date(filterDate.getTime() + ONE_DAY);
    setFilterDate(nextDate);
  };

  return (
    <>
      {/* 筛选区 */}
      <FilterBarContainer ref={ref}>
        {/* 按日期筛选 */}
        <FilterDateRow>
          <FilterDateBtn
            $active={!isToday}
            onClick={() => setDatePickerVisible(true)}
          >
            <IoIosCalendar size={vw(14)} color="currentColor" />
            <span>
              {isToday
                ? "今天"
                : `${filterDate.getMonth() + 1}月${filterDate.getDate()}日`}
            </span>
          </FilterDateBtn>
          <FilterPrevDayBtn onClick={setPrevFilterDate}>
            前一天
          </FilterPrevDayBtn>
          {isShowNextDayBtn && (
            <FilterPrevDayBtn onClick={setNextFilterDate}>
              后一天
            </FilterPrevDayBtn>
          )}

          {/* 选中非今天的日期时，显示恢复按钮 */}
          {!isToday && (
            <FilterResetBtn onClick={() => setFilterDate(new Date())}>
              今天
            </FilterResetBtn>
          )}
        </FilterDateRow>
        {/* 按类型筛选 */}
        <FilterTypeScroll>
          <FilterChip $active={!filterType} onClick={() => setFilterType("")}>
            全部
          </FilterChip>
          {filterTypeOptions.map((item) => (
            <FilterChip
              key={item.value}
              $active={filterType === item.value}
              onClick={() => setFilterType(item.value)}
            >
              {item.label}
            </FilterChip>
          ))}
        </FilterTypeScroll>
      </FilterBarContainer>

      {/* 日期筛选选择器（一年前 ~ 今天） */}
      <DatePicker
        title="选择日期"
        type="date"
        showChinese
        visible={datePickerVisible}
        startDate={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)}
        endDate={new Date()}
        value={filterDate}
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
        onClose={() => setDatePickerVisible(false)}
      />
    </>
  );
}

export default React.forwardRef<HTMLDivElement, IProps>(FilterBar);
