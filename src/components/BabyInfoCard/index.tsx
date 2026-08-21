import { useState, useEffect } from "react";
// 导入store
import { useBabyStore } from "@/store";
// 导入类型
import type { IBabyItem } from "@/interface/baby";
// 导入工具函数
import { formatBirthday, getBabyAge } from "@/utils";
// 导入图标
import { IoFemale, IoMale } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
// 导入样式
import {
  BabyBanner,
  BabyAvatar,
  BabyInfo,
  BabyNameRow,
  BabyName,
  BabyDesc,
} from "./styles";
// 导入工具函数
import { vw } from "@/utils";

interface IProps {
  id: string;
}

function BabyInfoCard(props: IProps) {
  const { id } = props;
  const { getBabyInfo } = useBabyStore((state) => state);
  // baby个人信息
  const [babeInfo, setBabyInfo] = useState<IBabyItem>(null);

  useEffect(() => {
    getBabyInfo({ id }).then((data: IBabyItem) => {
      setBabyInfo(data);
    });
  }, []);

  return (
    <BabyBanner>
      <BabyAvatar>
        {babeInfo?.avatarUrl ? (
          <img src={babeInfo.avatarUrl} alt="" />
        ) : (
          <AiOutlineUser color="#ff6b8a" size={vw(32)} />
        )}
      </BabyAvatar>
      <BabyInfo>
        <BabyNameRow>
          <BabyName>{babeInfo?.nickname}</BabyName>
          {babeInfo?.gender === 0 ? (
            <IoFemale color="#fff" size={vw(16)} />
          ) : (
            <IoMale color="#fff" size={vw(16)} />
          )}
        </BabyNameRow>
        <BabyDesc>
          出生：{formatBirthday(babeInfo?.birthday)} ·{" "}
          {getBabyAge(babeInfo?.birthday)}
        </BabyDesc>
      </BabyInfo>
    </BabyBanner>
  );
}

export default BabyInfoCard;
