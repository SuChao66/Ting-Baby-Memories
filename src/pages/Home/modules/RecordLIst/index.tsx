import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

// 上次自动跳转时所在的首页历史条目 key（刷新页面后重置）
// 同一条历史条目只允许自动跳转一次，防止从成长轨迹页返回首页时再次跳转导致无法返回
let autoRedirectedFromKey: string | null = null;

function BabyList() {
  const { getBabyList, setBabyId } = useBabyStore((state) => state);
  // 当前用户相关联的宝宝
  const [babies, setBabies] = useState<IBabyItem[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 组件卸载后放弃本次请求结果，避免快速返回登录页时仍触发跳转
    let cancelled = false;
    // 获取宝宝列表
    getBabyList().then((data) => {
      if (cancelled) return;
      setBabies(data);
      const fromLogin = location.state?.from === "/login";
      // 本次会话首次进入首页，或从登录页进入了新的首页条目时，
      // 默认跳转至第一个宝宝的成长轨迹页面
      if (
        data.length > 0 &&
        (autoRedirectedFromKey === null ||
          (fromLogin && autoRedirectedFromKey !== location.key))
      ) {
        autoRedirectedFromKey = location.key;
        const babyId = data[0]._id;
        // 更新当前babyId
        setBabyId(babyId);
        navigate(`/timeline/${babyId}`);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // 查看记录详情
  const handleViewTimeline = (babyId: string) => {
    // 更新当前babyId
    setBabyId(babyId);
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
                <BabyRecords>{baby.record_count}条成长记录</BabyRecords>
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
