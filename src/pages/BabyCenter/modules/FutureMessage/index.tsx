import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// 导入组件
import NavHeader from "@/components/navHeader";
import MessageCard from "./components/MessageCard";
import Empty from "./components/Empty";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
// 导入样式
import { FutureMessageContainer, FutureMessageList, BtnWraper } from "./styles";
// 导入store
import { useFutureMessageStore } from "@/store";
// 导入接口
import { getBabyInfoApi } from "@/api";
// 导入常量
import { DEFAULT_PAGE_SIZE } from "@/enums/constants";
// 导入类型
import type { IFutureMessage } from "@/interface/futureMessage";

function FutureMessage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getFutureMessageList } = useFutureMessageStore((state) => state);

  // 未来寄语列表
  const [futureMessageList, setFutureMessageList] = useState<IFutureMessage[]>(
    [],
  );
  // 当前页码
  const [page] = useState(1);
  // 总页数
  const [, setTotal] = useState(0);
  // 宝宝生日（计算解锁那天宝宝的年龄）
  const [birthday, setBirthday] = useState<string | null>(null);

  // 初始加载：获取宝宝生日 + 未来寄语列表
  useEffect(() => {
    getBabyInfoApi({ id: id! }).then(({ code, data }) => {
      if (code === 0 && data?.birthday) {
        setBirthday(String(data.birthday));
      }
    });
    // 获取未来寄语列表(未解锁列表)
    getFutureMessage();
  }, [id]);

  // 获取未来寄语
  const getFutureMessage = async () => {
    const params = {
      babyId: id,
      page: page,
      pageSize: DEFAULT_PAGE_SIZE,
    };
    const data = await getFutureMessageList(params);
    if (data?.list) {
      setFutureMessageList(data.list);
      setTotal(data.total);
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
    getFutureMessage();
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
          <FutureMessageList>
            {futureMessageList.map((item) => (
              <MessageCard
                key={item._id}
                item={item}
                birthday={birthday}
                onDelete={() => handleDeleteMessage(item._id)}
              />
            ))}
          </FutureMessageList>
        ) : (
          <Empty />
        )}
      </FutureMessageContainer>
    </>
  );
}

export default FutureMessage;
