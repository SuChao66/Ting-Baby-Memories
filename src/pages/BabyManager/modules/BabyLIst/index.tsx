import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// 导入宝宝列表样式组件
import {
  BabyListContainer,
  BabyItem,
  BabyAvatar,
  BabyInfoSection,
  BabyName,
  BabyBirthday,
  BabyNo,
} from "./style";
import { CardRow, RowArrow } from "@/styles/common";
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

function BabyList() {
  const { getBabyList } = useBabyStore((state) => state);
  const [babies, setBabies] = useState<IBabyItem[]>([]);
  const naviagte = useNavigate();

  useEffect(() => {
    // 获取宝宝列表
    getBabyList().then((data) => {
      setBabies(data);
    });
  }, []);

  // 查看宝宝档案
  const handleViewBabyFile = (id: string) => {
    naviagte(`/baby-file/${id}`);
  };

  return (
    <BabyListContainer>
      {babies.length > 0 ? (
        <BabyItem>
          {babies.map((baby, index) => (
            <CardRow
              key={baby._id}
              $isLast={index === babies.length - 1}
              onClick={() => handleViewBabyFile(baby._id)}
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
            </CardRow>
          ))}
        </BabyItem>
      ) : (
        <Empty text="暂无数据，快来添加你的宝宝～" />
      )}
    </BabyListContainer>
  );
}

export default BabyList;
