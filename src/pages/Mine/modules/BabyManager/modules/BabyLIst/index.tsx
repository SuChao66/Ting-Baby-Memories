import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// 导入宝宝列表样式组件
import {
  BabyListContainer,
  BabyItem,
  SwipeItem,
  SwipeContent,
  DeleteButton,
  BabyAvatar,
  BabyInfoSection,
  BabyName,
  BabyBirthday,
  BabyNo,
} from "./style";
import { RowArrow } from "@/styles/common";
// 导入图标
import { AiOutlineRight } from "react-icons/ai";
import { PiBabyLight } from "react-icons/pi";
import { IoFemale, IoMale } from "react-icons/io5";
// 导入宝宝信息类型
import type { IBabyItem } from "@/interface/baby";
// 导入 vw 工具函数
import { vw, formatBirthday } from "@/utils";
// 导入组件
import Empty from "@/baseUI/empty";
// 导入store
import { useBabyStore } from "@/store";

/** 删除按钮宽度（vw 单位值） */
const DELETE_WIDTH = 80;

function BabyList() {
  const { getBabyList, deleteBaby } = useBabyStore((state) => state);
  const [babies, setBabies] = useState<IBabyItem[]>([]);
  const naviagte = useNavigate();

  // 当前展开删除按钮的宝宝 id
  const [openId, setOpenId] = useState<string | null>(null);
  // 拖拽相关状态
  const startX = useRef(0);
  const currentOffset = useRef(0);
  const draggingId = useRef<string | null>(null);

  useEffect(() => {
    // 获取宝宝列表
    getBabyList().then((data) => {
      setBabies(data || []);
    });
  }, []);

  // 查看宝宝档案
  const handleViewBabyFile = (id: string) => {
    if (openId) {
      setOpenId(null);
      return;
    }
    naviagte(`/baby-file/${id}`);
  };

  // 触摸开始
  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    startX.current = e.touches[0].clientX;
    draggingId.current = id;
    currentOffset.current = openId === id ? -DELETE_WIDTH : 0;
  };

  // 触摸移动
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggingId.current) return;
    const delta = e.touches[0].clientX - startX.current;
    let offset = currentOffset.current + delta;
    // 限制范围：-80 ~ 0
    if (offset > 0) offset = 0;
    if (offset < -DELETE_WIDTH) offset = -DELETE_WIDTH;
    // 实时更新 DOM（通过 data 属性驱动样式）
    const el = e.currentTarget as HTMLElement;
    el.style.transform = `translateX(${vw(offset)})`;
    el.style.transition = "none";
  };

  // 触摸结束
  const handleTouchEnd = (e: React.TouchEvent, id: string) => {
    if (!draggingId.current) return;
    const el = e.currentTarget as HTMLElement;
    el.style.transition = "transform 0.3s ease";
    // 滑动超过一半则展开，否则收起
    const rect = el.getBoundingClientRect();
    const offsetX = rect.left - el.parentElement!.getBoundingClientRect().left;
    const shouldOpen = offsetX < -DELETE_WIDTH / 2;
    if (shouldOpen) {
      el.style.transform = `translateX(${vw(-DELETE_WIDTH)})`;
      setOpenId(id);
    } else {
      el.style.transform = `translateX(0)`;
      setOpenId(null);
    }
    draggingId.current = null;
  };

  // 删除宝宝档案
  const handleDelete = async () => {
    const ok = await deleteBaby({ id: openId! });
    if (ok) {
      // 获取宝宝列表
      getBabyList().then((data) => {
        setBabies(data || []);
      });
    }
  };

  return (
    <BabyListContainer>
      {babies.length > 0 ? (
        <BabyItem>
          {babies.map((baby) => (
            <SwipeItem key={baby._id}>
              <SwipeContent
                $offset={openId === baby._id ? -DELETE_WIDTH : 0}
                onClick={() => handleViewBabyFile(baby._id)}
                onTouchStart={(e) => handleTouchStart(e, baby._id)}
                onTouchMove={handleTouchMove}
                onTouchEnd={(e) => handleTouchEnd(e, baby._id)}
              >
                <BabyAvatar>
                  {baby.avatarUrl ? (
                    <img src={baby.avatarUrl} alt="头像" className="avatar" />
                  ) : (
                    <PiBabyLight color="#ff6b8a" size={vw(24)} />
                  )}
                </BabyAvatar>
                <BabyInfoSection>
                  <BabyName>
                    {baby.nickname}
                    {baby.gender === 0 ? (
                      <IoFemale color="red" />
                    ) : (
                      <IoMale color="blue" />
                    )}
                  </BabyName>
                  <BabyBirthday>
                    出生日：{formatBirthday(baby.birthday)}
                  </BabyBirthday>
                  <BabyNo>宝宝号：{baby._id}</BabyNo>
                </BabyInfoSection>
                <RowArrow>
                  <AiOutlineRight size={vw(14)} />
                </RowArrow>
              </SwipeContent>
              <DeleteButton onClick={handleDelete}>删除</DeleteButton>
            </SwipeItem>
          ))}
        </BabyItem>
      ) : (
        <Empty text="暂无数据，快来添加你的宝宝～" />
      )}
    </BabyListContainer>
  );
}

export default BabyList;
