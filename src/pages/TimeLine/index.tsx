import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
// 导入组件
import NavHeader from "@/components/navHeader";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入组件
import Empty from "@/baseUI/empty";
import BabyInfo from "./modules/babyInfo";
// 导入样式
import {
  TimeLineContainer,
  TimelineWrapper,
  TimelineGroup,
  DateLabel,
  TimelineItem,
  RecordCard,
  RecordHeader,
  RecordTime,
  TagWrap,
  RecordTag,
  RecordContent,
  ImageGrid,
  GridImage,
  FloatButton,
} from "./styles";

function TimeLine() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timelineData] = useState([]);

  // 进入发布记录页面
  const handleAddTimeLine = () => {
    navigate("/add-timeline");
  };

  // 模拟时间线数据
  // const timelineData = [
  //   {
  //     date: "2024年8月20日",
  //     records: [
  //       {
  //         time: "10:30",
  //         tags: ["第一次"],
  //         content: "宝宝今天第一次自己站起来了！扶着沙发摇摇晃晃的，好可爱呀～",
  //         images: ["", "", ""],
  //       },
  //       {
  //         time: "08:00",
  //         tags: ["日常"],
  //         content: "早上喝完奶精神特别好，咯咯笑个不停。",
  //         images: [""],
  //       },
  //     ],
  //   },
  //   {
  //     date: "2024年8月19日",
  //     records: [
  //       {
  //         time: "15:20",
  //         tags: [" milestone"],
  //         content:
  //           "今天带宝宝去做了8个月体检，身高72cm，体重9.2kg，一切指标正常！",
  //         images: ["", ""],
  //       },
  //     ],
  //   },
  // ];

  return (
    <>
      <NavHeader title="成长轨迹" back={<IoIosArrowBack size={22} />} />
      <TimeLineContainer>
        {/* 宝宝信息横幅 */}
        <BabyInfo id={id} />

        {/* 时间线 */}
        <TimelineWrapper>
          {timelineData.length > 0 ? (
            timelineData.map((group, gIndex) => (
              <TimelineGroup key={gIndex}>
                <DateLabel>{group.date}</DateLabel>
                {group.records.map((record, rIndex) => (
                  <TimelineItem key={rIndex}>
                    <RecordCard>
                      <RecordHeader>
                        <RecordTime>{record.time}</RecordTime>
                        <TagWrap>
                          {record.tags.map((tag, tIndex) => (
                            <RecordTag key={tIndex}>{tag}</RecordTag>
                          ))}
                        </TagWrap>
                      </RecordHeader>
                      <RecordContent>{record.content}</RecordContent>
                      {record.images.length > 0 && (
                        <ImageGrid>
                          {record.images.map((img, iIndex) => (
                            <GridImage key={iIndex}>
                              {img && <img src={img} alt="记录图片" />}
                            </GridImage>
                          ))}
                        </ImageGrid>
                      )}
                    </RecordCard>
                  </TimelineItem>
                ))}
              </TimelineGroup>
            ))
          ) : (
            <Empty text="暂无记录" />
          )}
        </TimelineWrapper>

        {/* 悬浮发布按钮 */}
        <FloatButton onClick={handleAddTimeLine}>
          <AiOutlinePlus color="#fff" size={vw(24)} />
        </FloatButton>
      </TimeLineContainer>
    </>
  );
}

export default TimeLine;
