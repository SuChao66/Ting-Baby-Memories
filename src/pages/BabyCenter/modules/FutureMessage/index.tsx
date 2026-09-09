import { useState, useEffect } from "react";
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

function FutureMessage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getFutureMessageList } = useFutureMessageStore((state) => state);

  // 未来寄语列表
  const [futureMessageList, setFutureMessageList] = useState<IFutureMessage[]>(
    [],
  );
  // 当前页码
  const [page, setPage] = useState(1);
  // 宝宝生日（计算解锁那天宝宝的年龄）
  const [birthday, setBirthday] = useState<string | null>(null);
  // 加载状态
  const [loading, setLoading] = useState(false);
  // 是否还有更多数据
  const [hasMore, setHasMore] = useState(true);

  // 初始加载：获取宝宝生日 + 未来寄语列表
  useEffect(() => {
    getBabyInfoApi({ id: id! }).then(({ code, data }) => {
      if (code === 0 && data?.birthday) {
        setBirthday(String(data.birthday));
      }
    });
    // 获取未来寄语列表(未解锁列表)
    getFutureMessage(page, false);
  }, [id]);

  // 获取未来寄语列表(未解锁列表)
  const getFutureMessage = async (page: number, isMore: boolean = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const params = {
        babyId: id,
        page: page,
        pageSize: DEFAULT_PAGE_SIZE,
        isUnlock: false,
      };
      const data = await getFutureMessageList(params);
      if (data?.list) {
        const newList = isMore
          ? [...futureMessageList, ...data.list]
          : data.list;
        setFutureMessageList(newList);
        setHasMore(newList.length < data.total);
      }
    } finally {
      setLoading(false);
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

  // 从列表中移除已删除的寄语
  const handleDeleteMessage = (msgId: string) => {
    setFutureMessageList((prev) => prev.filter((item) => item._id !== msgId));
    // 获取未来寄语列表(未解锁列表)
    getFutureMessage(page, false);
  };

  // 滚动触底加载下一页
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    if (distanceToBottom < SCROLL_THRESHOLD && hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      getFutureMessage(nextPage, true);
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
        {futureMessageList.length > 0 ? (
          <FutureMessageList onScroll={handleScroll}>
            {futureMessageList.map((item) => (
              <MessageCard
                key={item._id}
                item={item}
                birthday={birthday}
                onDelete={() => handleDeleteMessage(item._id)}
              />
            ))}
            <LoadMoreTip>
              {loading ? "加载中..." : hasMore ? "" : "没有更多了"}
            </LoadMoreTip>
          </FutureMessageList>
        ) : (
          <Empty />
        )}
      </FutureMessageContainer>
    </>
  );
}

export default FutureMessage;
