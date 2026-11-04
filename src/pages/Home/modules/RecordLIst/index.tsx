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
  LoadingMask,
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
  // 列表是否加载中
  const [loading, setLoading] = useState(true);
  // 是否正在自动跳转中（跳转期间保持空白，直到路由切换完成）
  const [redirecting, setRedirecting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 渲染期同步判断本次挂载是否会自动跳转（与 useEffect 内的跳转条件一致），
  // 仅用于跳转决策；列表区域在数据返回前统一展示 Loading
  const fromLogin = location.state?.from === "/login";
  const willRedirect =
    autoRedirectedFromKey === null ||
    (fromLogin && autoRedirectedFromKey !== location.key);

  useEffect(() => {
    // 组件卸载后放弃本次请求结果，避免快速返回登录页时仍触发跳转
    let cancelled = false;
    // 获取宝宝列表
    getBabyList().then((data) => {
      if (cancelled) return;
      // 本次会话首次进入首页，或从登录页进入了新的首页条目时，
      // 默认跳转至第一个宝宝的成长轨迹页面
      if (willRedirect && data.length > 0) {
        autoRedirectedFromKey = location.key;
        // 保持空白渲染并立即跳转；不更新列表状态，
        // 避免列表状态更新（紧急）先于路由切换（过渡）上屏导致列表闪现
        setRedirecting(true);
        setBabyId(data[0]._id);
        navigate(`/timeline/${data[0]._id}`);
        return;
      }
      setBabies(data);
      setLoading(false);
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
        {loading || redirecting ? (
          // 数据加载中及跳转过渡期间展示全屏蒙层，直到路由切换完成
          <LoadingMask>
            <Loading />
          </LoadingMask>
        ) : babies.length > 0 ? (
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
