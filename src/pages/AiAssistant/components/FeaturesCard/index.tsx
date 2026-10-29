import { useState } from "react";
// 导入样式
import {
  CardContainer,
  FeatureRow,
  FeatureIcon,
  FeatureTexts,
  FeatureLabel,
  FeatureDesc,
  FeatureArrow,
  Dots,
  Dot,
} from "./styles";
// 导入图标
import { AiOutlineRight } from "react-icons/ai";
import {
  TbPencilPlus,
  TbCalendarStats,
  TbHeartRateMonitor,
} from "react-icons/tb";
// 导入工具函数
import { vw } from "@/utils";

interface IProps {
  handleComingSoon: () => void;
}

/** 功能入口列表（AI 场景聚合，能力上线后接入真实跳转） */
const features = [
  {
    key: "record",
    icon: <TbPencilPlus color="#ff6b8a" size={vw(20)} />,
    label: "帮我写记录",
    desc: "一句话描述，AI 帮你写成有温度的成长日记",
  },
  {
    key: "weekly",
    icon: <TbCalendarStats color="#ff6b8a" size={vw(20)} />,
    label: "AI 成长周报",
    desc: "自动汇总每周成长点滴、喂养睡眠与身高变化",
  },
  {
    key: "insight",
    icon: <TbHeartRateMonitor color="#ff6b8a" size={vw(20)} />,
    label: "健康数据解读",
    desc: "结合生长曲线与喂养睡眠，生成趋势小洞察",
  },
];

/** 每页展示的功能入口数量 */
const FEATURE_PAGE_SIZE = 2;

/** 按 FEATURE_PAGE_SIZE 分组，作为轮播分页数据 */
const featurePages: (typeof features)[] = [];
for (let i = 0; i < features.length; i += FEATURE_PAGE_SIZE) {
  featurePages.push(features.slice(i, i + FEATURE_PAGE_SIZE));
}

export default function FeaturesCard(props: IProps) {
  const { handleComingSoon } = props;

  // 功能轮播当前页索引
  const [activePage, setActivePage] = useState(0);

  return (
    <CardContainer>
      <Swiper
        style={{ height: vw(156) }}
        duration={3000}
        autoplay
        loop
        touchable
        indicator={false}
        onChange={(index) => setActivePage(index)}
      >
        {featurePages.map((page, pageIndex) => (
          <SwiperItem key={pageIndex} style={{ height: "100%" }}>
            {page.map((item, index) => (
              <FeatureRow
                key={item.key}
                $isLast={index === page.length - 1}
                onClick={handleComingSoon}
              >
                <FeatureIcon>{item.icon}</FeatureIcon>
                <FeatureTexts>
                  <FeatureLabel>{item.label}</FeatureLabel>
                  <FeatureDesc>{item.desc}</FeatureDesc>
                </FeatureTexts>
                <FeatureArrow>
                  <AiOutlineRight size={vw(14)} />
                </FeatureArrow>
              </FeatureRow>
            ))}
          </SwiperItem>
        ))}
      </Swiper>
      <Dots>
        {featurePages.map((_, index) => (
          <Dot key={index} $active={index === activePage} />
        ))}
      </Dots>
    </CardContainer>
  );
}
