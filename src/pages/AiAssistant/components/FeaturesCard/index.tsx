// 导入样式
import {
  CardContainer,
  FeatureRow,
  FeatureIcon,
  FeatureTexts,
  FeatureLabel,
  FeatureDesc,
  FeatureArrow,
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
// 导入类型
import type { AiScene } from "@/interface/ai";

/** 功能项 */
interface FeatureItem {
  key: AiScene;
  icon: React.ReactNode;
  label: string;
  desc: string;
  /** 点击后填充到输入框的引导语 */
  prompt: string;
}

interface IProps {
  onSelect: (feature: { key: AiScene; prompt: string }) => void;
}

/** AI 功能列表（点击后由父级填充引导语并记录场景） */
const features: FeatureItem[] = [
  {
    key: "record",
    icon: <TbPencilPlus color="#ff6b8a" size={vw(20)} />,
    label: "帮我写记录",
    desc: "一句话描述，AI 帮你写成有温度的成长日记",
    prompt: "帮我写一条成长记录：",
  },
  {
    key: "weekly",
    icon: <TbCalendarStats color="#ff6b8a" size={vw(20)} />,
    label: "AI 成长周报",
    desc: "自动汇总每周成长点滴、喂养睡眠与身高变化",
    prompt: "帮我生成宝宝本周的成长周报",
  },
  {
    key: "insight",
    icon: <TbHeartRateMonitor color="#ff6b8a" size={vw(20)} />,
    label: "健康数据解读",
    desc: "结合生长曲线与喂养睡眠，生成趋势小洞察",
    prompt: "帮我解读宝宝最近的生长数据和喂养睡眠情况",
  },
];

export default function FeaturesCard(props: IProps) {
  const { onSelect } = props;

  return (
    <CardContainer>
      {features.map((item, index) => (
        <FeatureRow
          key={item.key}
          $isLast={index === features.length - 1}
          onClick={() => onSelect(item)}
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
    </CardContainer>
  );
}
