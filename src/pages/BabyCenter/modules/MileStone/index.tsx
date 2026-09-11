import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// 导入组件
import NavHeader from "@/components/navHeader";
import MileStoneCard from "./components/MileStoneCard";
import Empty from "./components/MileStoneEmpty";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
// 导入样式
import {
  MileStoneContainer,
  MilestoneList,
  LoadMoreTip,
  AddButton,
} from "./styles";
// 导入状态管理
import { useTimelineStore } from "@/store/modules/timeline";
// 导入接口
import { getBabyInfoApi } from "@/api";
// 导入类型
import type { ITimelineItem } from "@/interface/timeline";

const PAGE_SIZE = 10;
// 滚动触底阈值（px）
const SCROLL_THRESHOLD = 80;

function MileStone() {
  const navigate = useNavigate();
  const { id } = useParams();
  // 获取状态管理中的大事记记录列表
  const getTimeLineList = useTimelineStore((state) => state.getTimeLineList);

  // 分页状态
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [milestoneList, setMilestoneList] = useState<ITimelineItem[]>([]);
  // 宝宝生日（计算大事记发生时的月龄）
  const [birthday, setBirthday] = useState<string | null>(null);

  const handleAddTimeLine = () => {
    navigate("/add-timeline", {
      state: {
        isMilestone: true,
      },
    });
  };

  // 加载数据
  const loadList = async (pageNum: number, isReset: boolean) => {
    if (loading || !id) return;
    setLoading(true);
    try {
      const params = {
        babyId: id,
        page: pageNum,
        pageSize: PAGE_SIZE,
        // 仅查询大事记
        isMilestone: true,
      };
      const res = await getTimeLineList(params);
      if (!res) return;
      const list = res.data || [];
      // 累积数据（重置时替换，翻页时拼接）
      setMilestoneList((prev) => (isReset ? list : [...prev, ...list]));
      // 已加载数量 >= 总数，说明没有更多了
      setHasMore(list.length < res.total);
    } finally {
      setLoading(false);
    }
  };

  // 滚动触底加载下一页
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    if (distanceToBottom < SCROLL_THRESHOLD && hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadList(nextPage, false);
    }
  };

  // 初始加载：获取宝宝生日 + 大事记列表
  useEffect(() => {
    getBabyInfoApi({ id: id! }).then(({ code, data }) => {
      if (code === 0 && data?.birthday) {
        setBirthday(String(data.birthday));
      }
    });
    loadList(1, true);
  }, []);

  // 跳转至大事记详情页
  const handleJumpToDetail = (item: ITimelineItem) => {
    navigate("/mile-stone-detail", {
      state: {
        item,
      },
    });
  };

  return (
    <>
      <NavHeader
        title="大事记"
        back={<IoIosArrowBack size={22} />}
        right={<AddButton onClick={handleAddTimeLine}>添加</AddButton>}
      />
      <MileStoneContainer>
        {milestoneList.length > 0 ? (
          <MilestoneList onScroll={handleScroll}>
            {milestoneList.map((item) => (
              <MileStoneCard
                key={item._id}
                item={item}
                birthday={birthday}
                jumpToDetail={() => handleJumpToDetail(item)}
              />
            ))}
            <LoadMoreTip>
              {loading ? "加载中..." : hasMore ? "" : "没有更多了"}
            </LoadMoreTip>
          </MilestoneList>
        ) : (
          !loading && <Empty />
        )}
      </MileStoneContainer>
    </>
  );
}

export default MileStone;
