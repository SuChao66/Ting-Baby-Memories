import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// 导入宝宝列表样式组件
import {
  BabyListContainer,
  BabyItem,
  SwipeItem,
  BabyAvatar,
  BabyInfoSection,
  BabyName,
  BabyRecords,
} from "./style";
import { RowArrow } from "@/styles/common";
// 导入图标
import { AiOutlineRight } from "react-icons/ai";
import { PiBabyLight } from "react-icons/pi";
import { IoFemale, IoMale } from "react-icons/io5";
// 导入宝宝信息类型
import type { IBabyItem } from "@/interface/baby";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入store
import { useBabyStore } from "@/store";
// 导入组件
import Empty from "@/baseUI/empty";

function BabyList() {
  const { getBabyList } = useBabyStore((state) => state);
  // 当前用户相关联的宝宝
  const [babies, setBabies] = useState<IBabyItem[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    // 获取宝宝列表
    getBabyList().then((data) => {
      setBabies(data);
    });
  }, []);

  // 查看记录详情
  const handleViewTimeline = (babyId: string) => {
    navigate(`/timeline/${babyId}`);
  };

  return (
    <BabyListContainer>
      <BabyItem>
        {babies.length > 0 ? (
          babies.map((baby) => (
            <SwipeItem
              key={baby._id}
              onClick={() => handleViewTimeline(baby._id)}
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
                <BabyRecords>0条成长记录</BabyRecords>
              </BabyInfoSection>
              <RowArrow>
                <AiOutlineRight size={vw(14)} />
              </RowArrow>
            </SwipeItem>
          ))
        ) : (
          <Empty text="暂无数据，快来添加你的宝宝～" />
        )}
      </BabyItem>
    </BabyListContainer>
  );
}

export default BabyList;
