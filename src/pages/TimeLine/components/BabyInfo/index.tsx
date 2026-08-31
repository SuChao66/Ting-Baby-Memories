import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// 导入图标
import { IoFemale, IoMale } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
// 导入工具函数
import { vw, formatBirthday, getBabyAge } from "@/utils";
// 导入类型
import type { IBabyItem } from "@/interface/baby";
// 导入store
import { useBabyStore } from "@/store";
// 导入style
import {
  ProfileBanner,
  BannerAvatar,
  BannerInfo,
  BannerNameRow,
  BannerName,
  BannerBirthday,
  BannerStats,
  StatValue,
  BabyCenter,
} from "./styles";

function BabyInfo(props: { id: string }) {
  const { getBabyInfo } = useBabyStore((state) => state);
  const { id } = props;
  const navigate = useNavigate();
  const [babeInfo, setBabyInfo] = useState<IBabyItem | null>(null);

  useEffect(() => {
    getBabyInfo({ id }).then((data) => {
      if (!data) return;
      setBabyInfo(data);
    });
  }, []);

  // 进入宝宝个人中心
  const handleNavigateToBabyCenter = () => {
    navigate(`/baby-center/${id}`);
  };

  return (
    <ProfileBanner>
      <BannerAvatar>
        <img src={babeInfo?.avatarUrl} alt="" />
      </BannerAvatar>
      <BannerInfo>
        <BannerNameRow>
          <BannerName>{babeInfo?.nickname}</BannerName>
          {babeInfo?.gender == 0 ? (
            <IoFemale color="#fff" size={vw(16)} />
          ) : (
            <IoMale color="#fff" size={vw(16)} />
          )}
        </BannerNameRow>
        <BannerBirthday>{formatBirthday(babeInfo?.birthday)}</BannerBirthday>
        <BannerStats>
          <StatValue>出生：{getBabyAge(babeInfo?.birthday)}</StatValue>
        </BannerStats>
      </BannerInfo>
      <BabyCenter onClick={handleNavigateToBabyCenter}>
        宝宝个人中心
        <IoIosArrowForward size={14} />
      </BabyCenter>
    </ProfileBanner>
  );
}

export default BabyInfo;
