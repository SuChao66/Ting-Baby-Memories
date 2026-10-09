import { useCallback, useEffect, useRef, useState } from "react";
// 导入图标
import { AiOutlineClose } from "react-icons/ai";
// 导入信件卡片组件
import MessageCard from "@/pages/BabyCenter/modules/FutureMessage/components/MessageCard";
// 导入store
import { useFutureMessageStore, useBabyStore } from "@/store";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入类型
import type { IFutureMessage } from "@/interface/futureMessage";
// 导入样式
import {
  UnlockPopupHeader,
  UnlockPopupTitle,
  UnlockPopupCount,
  UnlockMarkReadBtn,
  UnlockCloseBtn,
  UnlockList,
  LoadMore,
} from "./styles";

interface IProps {
  /** 宝宝id */
  babyId: string;
  /** 关闭弹层 */
  onClose: () => void;
}

/** 每页数量 */
const PAGE_SIZE = 10;

function UnlockFutureMessage(props: IProps) {
  const { babyId, onClose } = props;

  const getFutureMessageList = useFutureMessageStore(
    (state) => state.getFutureMessageList,
  );
  const markFutureMessageRead = useFutureMessageStore(
    (state) => state.markFutureMessageRead,
  );
  const getBabyInfo = useBabyStore((state) => state.getBabyInfo);

  // 弹层显示状态（关闭时先播放退场动画，再卸载组件）
  const [visible, setVisible] = useState(true);
  // 已解锁信件列表
  const [list, setList] = useState<IFutureMessage[]>([]);
  // 总数（用于判断是否还有更多）
  const [total, setTotal] = useState(0);
  // 是否加载中
  const [loading, setLoading] = useState(false);
  // 当前页码与加载锁（ref 防止滚动时重复请求）
  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  // 宝宝生日（计算解锁那天宝宝的年龄）
  const [birthday, setBirthday] = useState<string | null>(null);
  // 一键已读请求中
  const [marking, setMarking] = useState(false);
  // 是否已全部标记为已读（标记成功后隐藏按钮）
  const [markedAll, setMarkedAll] = useState(false);

  // 关闭弹层：先播放退场动画（0.3s），结束后再由父组件卸载
  // Popup 在 visible 变为 false 时还会回调一次 onClose，加守卫防止重复触发
  const handleClose = () => {
    if (!visible) return;
    setVisible(false);
    window.setTimeout(onClose, 300);
  };

  // 加载指定页的数据
  const loadData = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    const data = await getFutureMessageList({
      babyId,
      isUnlock: true,
      page: pageRef.current,
      pageSize: PAGE_SIZE,
    });
    setLoading(false);
    loadingRef.current = false;
    if (data) {
      setTotal(data.total);
      // 第一页直接覆盖，其余页追加
      setList((prev) =>
        pageRef.current === 1 ? data.list : [...prev, ...data.list],
      );
      pageRef.current += 1;
    }
  }, [babyId, getFutureMessageList]);

  useEffect(() => {
    // 首屏加载第一页已解锁信件
    loadData();
    // 拉取宝宝生日（用于展示"解锁那天宝宝的年龄"）
    getBabyInfo({ id: babyId }).then((info) => {
      if (info?.birthday) {
        setBirthday(String(info.birthday));
      }
    });
  }, [babyId, loadData, getBabyInfo]);

  // 一键已读：将当前已加载的信件标记为已读
  const handleMarkAllRead = async () => {
    if (marking || list.length === 0) return;
    setMarking(true);
    try {
      const messageIds = list.map((item) => item._id);
      const ok = await markFutureMessageRead({ babyId, messageIds });
      if (ok) {
        setMarkedAll(true);
        // 本地同步已读状态，信件标识立即更新
        setList((prev) => prev.map((item) => ({ ...item, isRead: true })));
        Toast.show({ title: "已标记为已读", icon: "success" });
      }
    } finally {
      setMarking(false);
    }
  };

  // 单条已读成功后同步列表数据（点开未读信件时角标立即更新）
  const handleMarkRead = (msgId: string) => {
    setList((prev) =>
      prev.map((item) =>
        item._id === msgId ? { ...item, isRead: true } : item,
      ),
    );
  };

  // 列表滚动到底部附近时加载下一页
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (loading || list.length >= total) return;
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    // 距底部不足 60px 时触发加载下一页
    if (scrollTop + clientHeight >= scrollHeight - 60) {
      loadData();
    }
  };

  return (
    <Popup visible={visible} position="bottom" round onClose={handleClose}>
      {/* 弹层头部：标题 + 总数 + 一键已读 + 关闭按钮 */}
      <UnlockPopupHeader>
        <UnlockPopupTitle>已解锁的信</UnlockPopupTitle>
        {total > 0 && <UnlockPopupCount>共 {total} 封</UnlockPopupCount>}
        {/* 一键已读按钮：标记成功后隐藏 */}
        {!markedAll && list.length > 0 && (
          <UnlockMarkReadBtn onClick={handleMarkAllRead}>
            {marking ? "标记中…" : "一键已读"}
          </UnlockMarkReadBtn>
        )}
        <UnlockCloseBtn onClick={handleClose}>
          <AiOutlineClose size={vw(16)} color="#999" />
        </UnlockCloseBtn>
      </UnlockPopupHeader>
      {/* 信件列表：滚动到底部自动加载下一页 */}
      <UnlockList onScroll={handleScroll}>
        {list.map((item) => (
          <MessageCard
            key={item._id}
            item={item}
            birthday={birthday}
            unlocked
            onRead={() => handleMarkRead(item._id)}
          />
        ))}
        {/* 空状态 */}
        {!loading && list.length === 0 && (
          <Empty description="暂无已解锁的信件" />
        )}
        {/* 底部加载提示 */}
        {loading && <LoadMore>加载中…</LoadMore>}
        {!loading && list.length > 0 && list.length >= total && (
          <LoadMore>没有更多了</LoadMore>
        )}
      </UnlockList>
    </Popup>
  );
}

export default UnlockFutureMessage;
