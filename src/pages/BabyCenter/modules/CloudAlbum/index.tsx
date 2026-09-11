import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// 导入组件
import NavHeader from "@/components/navHeader";
import Empty from "@/baseUI/empty";
import MediaItem from "./components/MediaItem";
// 导入图标
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// 导入 vw 工具函数
import { vw, formatMonth } from "@/utils";
// 导入样式
import {
  CloudAlbumContainer,
  TabCard,
  TabItem,
  Divider,
  ViewSwitch,
  SwitchTrack,
  MonthBar,
  MonthArrow,
  MonthText,
  AlbumList,
  DayGroup,
  DayHeader,
  DayDate,
  MediaGrid,
} from "./styles";
// 导入store
import { useTimelineStore } from "@/store";
// 导入类型
import type { TabKey } from "@/types";
import type { IFileList } from "@/interface/timeline";

/* ============ 页面组件 ============ */
function CloudAlbum() {
  const { id } = useParams();
  // 从store中获取文件列表
  const { getFileList } = useTimelineStore((state) => state);

  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [monthView, setMonthView] = useState(false);
  // 当前选中的月份（按月视图用），默认当月
  const [month, setMonth] = useState(formatMonth(new Date()));
  // 相册列表
  const [albumList, setAlbumList] = useState<IFileList>({});

  const tabs: { key: TabKey; label: string }[] = [
    { key: "all", label: "全部" },
    { key: "img", label: "照片" },
    { key: "video", label: "视频" },
  ];

  useEffect(() => {
    if (!id) return;
    if (monthView) {
      // 按月视图：加载指定月份
      getFileList(id, activeTab, true, month).then((data) => {
        setAlbumList(data);
      });
    } else {
      // 日视图：加载全部
      getFileList(id, activeTab).then((data) => {
        setAlbumList(data);
      });
    }
  }, [id, activeTab, monthView, month]);

  // 切换月份：offset 为 -1: 上个月 / 1: 下个月
  const handleMonthChange = (offset: number) => {
    const [y, m] = month.split("-").map(Number);
    const date = new Date(y, m - 1 + offset, 1);
    setMonth(formatMonth(date));
  };

  return (
    <>
      <NavHeader title="云相册" back={<IoIosArrowBack size={22} />} />
      <CloudAlbumContainer>
        {/* Tab 栏 */}
        <TabCard>
          {tabs.map((tab) => (
            <TabItem
              key={tab.key}
              $active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </TabItem>
          ))}
          <Divider />
          <ViewSwitch>
            <span>按月</span>
            <SwitchTrack
              $on={monthView}
              onClick={() => setMonthView(!monthView)}
            />
          </ViewSwitch>
        </TabCard>

        {/* 月份切换栏（按月视图显示） */}
        {monthView && (
          <MonthBar>
            <MonthArrow onClick={() => handleMonthChange(-1)}>
              <IoIosArrowBack size={vw(16)} />
            </MonthArrow>
            <MonthText>{month}</MonthText>
            <MonthArrow onClick={() => handleMonthChange(1)}>
              <IoIosArrowForward size={vw(16)} />
            </MonthArrow>
          </MonthBar>
        )}

        {/* 相册列表 */}
        <AlbumList>
          {Object.keys(albumList).length > 0 ? (
            Object.keys(albumList).map((date) => (
              <DayGroup key={date}>
                <DayHeader>
                  <DayDate>{date}</DayDate>
                </DayHeader>
                <MediaGrid>
                  {albumList[date].map((_, idx) => (
                    <MediaItem key={idx} files={albumList[date]} index={idx} />
                  ))}
                </MediaGrid>
              </DayGroup>
            ))
          ) : (
            <Empty />
          )}
        </AlbumList>
      </CloudAlbumContainer>
    </>
  );
}

export default CloudAlbum;
