import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
// 导入组件
import NavHeader from "@/components/navHeader";
import MessageCard from "./components/MessageCard";
import Empty from "./components/Empty";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
// 导入样式
import {
  FutureMessageContainer,
  FutureMessageList,
  BtnWraper,
  LoadMoreTip,
  TabBar,
  TabItem,
} from "./styles";
// 导入store
import { useFutureMessageStore } from "@/store";
// 导入接口
import { getBabyInfoApi } from "@/api";
// 导入常量
import { DEFAULT_PAGE_SIZE } from "@/enums/constants";
// 导入类型
import type { IFutureMessage } from "@/interface/futureMessage";

// 滚动触底阈值（px）
const SCROLL_THRESHOLD = 80;

// 页签：待开启（未解锁）/ 已解锁
type TabKey = "locked" | "unlocked";

// 各页签列表状态（列表数据独立缓存，切换页签不重复请求）
interface TabState {
  list: IFutureMessage[];
  page: number;
  hasMore: boolean;
}

const INIT_TAB_STATE: Record<TabKey, TabState> = {
  locked: { list: [], page: 1, hasMore: true },
  unlocked: { list: [], page: 1, hasMore: true },
};

function FutureMessage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getFutureMessageList } = useFutureMessageStore((state) => state);

  // 当前页签
  const [activeTab, setActiveTab] = useState<TabKey>("locked");
  // 各页签列表状态（列表数据独立缓存，切换页签不重复请求）
  const [tabStates, setTabStates] = useState(INIT_TAB_STATE);
  // 各页签是否已加载过（首次切换才请求）
  const loadedRef = useRef<Record<TabKey, boolean>>({
    locked: false,
    unlocked: false,
  });
  // 列表滚动容器（切换页签时重置滚动位置）
  const listRef = useRef<HTMLDivElement>(null);
  // 宝宝生日（计算解锁那天宝宝的年龄）
  const [birthday, setBirthday] = useState<string | null>(null);
  // 加载状态
  const [loading, setLoading] = useState(false);

  // 当前页签状态
  const tabState = tabStates[activeTab];

  // 初始加载：获取宝宝生日 + 待开启列表
  useEffect(() => {
    getBabyInfoApi({ id: id! }).then(({ code, data }) => {
      if (code === 0 && data?.birthday) {
        setBirthday(String(data.birthday));
      }
    });
    // 获取未来寄语列表(待开启列表)
    loadedRef.current.locked = true;
    getFutureMessage("locked", 1);
  }, [id]);

  // 获取未来寄语列表
  const getFutureMessage = async (
    tab: TabKey,
    page: number,
    isMore: boolean = false,
  ) => {
    if (!id) return;
    setLoading(true);
    try {
      const params = {
        babyId: id,
        page: page,
        pageSize: DEFAULT_PAGE_SIZE,
        isUnlock: tab === "unlocked",
      };
      const data = await getFutureMessageList(params);
      if (data?.list) {
        setTabStates((prev) => {
          const prevList = isMore ? prev[tab].list : [];
          const newList = isMore ? [...prevList, ...data.list] : data.list;
          return {
            ...prev,
            [tab]: {
              list: newList,
              page,
              hasMore: newList.length < data.total,
            },
          };
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // 切换页签（首次切换时请求对应列表，切回不重复请求）
  const handleTabChange = (tab: TabKey) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    // 重置滚动位置
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
    if (!loadedRef.current[tab]) {
      loadedRef.current[tab] = true;
      getFutureMessage(tab, 1);
    }
  };

  // 新增未来寄语
  const handleAddFutureMessage = () => {
    navigate("/add-future-message", {
      state: {
        babyId: id,
      },
    });
  };

  // 从列表中移除已删除的寄语（仅待开启页签可删除，本地移除即可）
  const handleDeleteMessage = (msgId: string) => {
    setTabStates((prev) => ({
      ...prev,
      locked: {
        ...prev.locked,
        list: prev.locked.list.filter((item) => item._id !== msgId),
      },
    }));
  };

  // 标记已读成功后同步列表数据（仅已解锁页签，角标随之刷新为"已读"）
  const handleMarkRead = (msgId: string) => {
    setTabStates((prev) => ({
      ...prev,
      unlocked: {
        ...prev.unlocked,
        list: prev.unlocked.list.map((item) =>
          item._id === msgId ? { ...item, isRead: true } : item,
        ),
      },
    }));
  };

  // 滚动触底加载下一页
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    if (distanceToBottom < SCROLL_THRESHOLD && tabState.hasMore && !loading) {
      const nextPage = tabState.page + 1;
      getFutureMessage(activeTab, nextPage, true);
    }
  };

  return (
    <>
      <NavHeader
        title="未来寄语"
        back={<IoIosArrowBack size={22} />}
        right={<BtnWraper onClick={handleAddFutureMessage}>写寄语</BtnWraper>}
      />
      <FutureMessageContainer>
        {/* 页签切换：待开启 / 已解锁 */}
        <TabBar>
          {(
            [
              { key: "locked", label: "待开启" },
              { key: "unlocked", label: "已解锁" },
            ] as const
          ).map((tab) => (
            <TabItem
              key={tab.key}
              $active={activeTab === tab.key}
              onClick={() => handleTabChange(tab.key)}
            >
              {tab.label}
            </TabItem>
          ))}
        </TabBar>
        {tabState.list.length > 0 ? (
          <FutureMessageList ref={listRef} onScroll={handleScroll}>
            {tabState.list.map((item) => (
              <MessageCard
                key={item._id}
                item={item}
                birthday={birthday}
                unlocked={activeTab === "unlocked"}
                onDelete={
                  activeTab === "locked"
                    ? () => handleDeleteMessage(item._id)
                    : undefined
                }
                onRead={
                  activeTab === "unlocked"
                    ? () => handleMarkRead(item._id)
                    : undefined
                }
              />
            ))}
            <LoadMoreTip>
              {loading ? "加载中..." : tabState.hasMore ? "" : "没有更多了"}
            </LoadMoreTip>
          </FutureMessageList>
        ) : loading ? (
          // 首次进入/首次切换页签时列表为空且请求中，展示加载态（避免闪现空状态）
          <LoadMoreTip>加载中...</LoadMoreTip>
        ) : (
          <Empty
            tip={
              activeTab === "locked"
                ? undefined
                : "还没有解锁的信件，到成长轨迹查看宝宝日常吧"
            }
            guide={activeTab === "locked"}
          />
        )}
      </FutureMessageContainer>
    </>
  );
}

export default FutureMessage;
