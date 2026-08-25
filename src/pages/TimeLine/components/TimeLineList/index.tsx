import { useState, useEffect } from "react";
// 导入样式
import {
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
  FileTypeBadge,
} from "./styles";
// 导入组件
import Empty from "@/baseUI/empty";
import VideoPreview from "@/baseUI/videoPreview";
// 导入store
import { useTimelineStore } from "@/store";
// 导入类型
import type {
  ITimelineItem,
  ITimelineGroup,
  IFile,
} from "@/interface/timeline";
// 导入图标
import { AiOutlinePlayCircle, AiOutlinePicture } from "react-icons/ai";
import { vw } from "@/utils";

function TimeLineList(props: { id: string }) {
  const { id } = props;
  const [pagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const [, setTotal] = useState(0);

  // 预览
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");
  const [files, setFiles] = useState([]);

  const { timeLineList, getTimeLineList, setTimelineList } = useTimelineStore(
    (state) => state,
  );

  useEffect(() => {
    getTimeLineLists();
  }, []);

  // 获取列表
  const getTimeLineLists = async () => {
    const params = {
      babyId: id,
      page: pagination.page,
      pageSize: pagination.pageSize,
    };
    const res = await getTimeLineList(params);
    setTotal(res.total);
    handleData(res.data);
  };

  // 处理数据 - 按日期分组
  const handleData = (data: ITimelineItem[]) => {
    const groupMap: Record<string, ITimelineItem[]> = {};

    // 按"YYYY年M月D日"分组
    data.forEach((item) => {
      const d = new Date(item.publishTime);
      const dateKey = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
      if (!groupMap[dateKey]) {
        groupMap[dateKey] = [];
      }
      groupMap[dateKey].push(item);
    });

    // 转换为目标结构
    const result: ITimelineGroup[] = Object.keys(groupMap).map((date) => ({
      date,
      records: groupMap[date].map((item) => {
        const d = new Date(item.publishTime);
        const hh = String(d.getHours()).padStart(2, "0");
        const mm = String(d.getMinutes()).padStart(2, "0");
        return {
          time: `${hh}:${mm}`,
          tags: item.tags || [],
          content: item.content,
          files: item.files || [],
          isMilestone: item.isMilestone,
          visibleRoles: item.visibleRoles,
          comments: item.comments || [],
        };
      }),
    }));

    setTimelineList(result);
  };

  // 点击文件预览
  const handlePreview = (files: IFile[], index: number) => {
    const file = files[index];
    setFiles(files);
    if (file.type === "VIDEO") {
      setVideoPreviewUrl(file.url);
    } else {
      // 计算在图片列表中的索引
      const imageIndex = files
        .slice(0, index)
        .filter((f) => f.type === "IMAGE").length;
      setPreviewIndex(imageIndex);
      setPreviewVisible(true);
    }
  };

  return (
    <>
      <TimelineWrapper>
        {timeLineList.length > 0 ? (
          (timeLineList as unknown as ITimelineGroup[]).map((group, gIndex) => (
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
                    {record.files.length > 0 && (
                      <ImageGrid>
                        {record.files.map((file, iIndex) => (
                          <GridImage
                            key={iIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePreview(record.files, iIndex);
                            }}
                          >
                            {file.type === "IMAGE" ? (
                              <img src={file.url} alt="记录图片" />
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
                  </RecordCard>
                </TimelineItem>
              ))}
            </TimelineGroup>
          ))
        ) : (
          <Empty text="暂无记录" />
        )}
      </TimelineWrapper>

      {/* 视频全屏预览 */}
      {videoPreviewUrl && (
        <VideoPreview
          videoPreviewUrl={videoPreviewUrl}
          setVideoPreviewUrl={setVideoPreviewUrl}
        />
      )}

      {/* 图片全屏预览 */}
      <ImagePreview
        visible={previewVisible}
        images={files
          .filter((f) => f.type === "IMAGE")
          .map((f) => ({ src: f.url }))}
        defaultValue={previewIndex}
        onClose={() => setPreviewVisible(false)}
      />
    </>
  );
}

export default TimeLineList;
