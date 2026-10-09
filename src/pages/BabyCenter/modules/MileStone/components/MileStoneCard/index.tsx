import { AiOutlinePlayCircle, AiOutlinePicture } from "react-icons/ai";
import { FaCircleArrowRight } from "react-icons/fa6";
// 导入 vw 工具函数
import { vw, getAgeAt, formatDate } from "@/utils";
// 导入样式
import {
  MilestoneCard,
  CardHeader,
  CardDate,
  AgeTag,
  CardContent,
  ImageGrid,
  GridImage,
  FileTypeBadge,
} from "./styles";
// 导入类型
import type { ITimelineItem } from "@/interface/timeline";

interface IProps {
  /** 大事记记录 */
  item: ITimelineItem;
  /** 宝宝生日（计算发生时月龄） */
  birthday: string | null;
  jumpToDetail: () => void;
}

function MileStoneCard(props: IProps) {
  const { item, birthday, jumpToDetail } = props;

  return (
    <MilestoneCard onClick={() => jumpToDetail()}>
      {/* 日期 + 月龄 + 跳转箭头 */}
      <CardHeader>
        <CardDate>{formatDate(item.publishTime)}</CardDate>
        <AgeTag>{getAgeAt(birthday, item.publishTime)}</AgeTag>
        <FaCircleArrowRight size={vw(18)} color="#ff6b8a" />
      </CardHeader>
      {/* 记录内容 */}
      <CardContent>{item.content}</CardContent>
      {/* 图片 / 视频 */}
      {item.files && item.files.length > 0 && (
        <ImageGrid>
          {item.files.map((file, idx) => (
            <GridImage key={idx}>
              {file.type === "IMAGE" ? (
                <img src={file.url} alt="大事记图片" />
              ) : (
                <video src={file.url} muted />
              )}
              <FileTypeBadge>
                {file.type === "VIDEO" ? (
                  <>
                    <AiOutlinePlayCircle size={vw(10)} />
                    视频
                  </>
                ) : (
                  <>
                    <AiOutlinePicture size={vw(10)} />
                    图片
                  </>
                )}
              </FileTypeBadge>
            </GridImage>
          ))}
        </ImageGrid>
      )}
    </MilestoneCard>
  );
}

export default MileStoneCard;
