import { useState } from "react";
import { vw } from "@/utils";
// 导入类型
import type { ITimelineGroupRecord, IFile } from "@/interface/timeline";
// 导入样式
import {
  TimelineItem,
  RecordCard,
  UserInfo,
  Avatar,
  UserName,
  RelationTag,
  HeaderRight,
  RecordTime,
  TagWrap,
  RecordTag,
  RecordContent,
  ImageGrid,
  GridImage,
  FileTypeBadge,
} from "./styles";
// 导入图标
import { AiOutlinePlayCircle, AiOutlinePicture } from "react-icons/ai";
import { MdStars } from "react-icons/md";
// 导入组件
import VideoPreview from "@/baseUI/videoPreview";
import Menu from "../Menu";
// 导入常量
import { RELATION_OPTIONS } from "@/enums";

interface IProps {
  record: ITimelineGroupRecord;
}

function TimeLineCard(props: IProps) {
  const { record } = props;

  // 预览
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");
  const [files, setFiles] = useState([]);

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

  // 用户与宝宝的关系
  const releationName = RELATION_OPTIONS.find(
    (item) => item.value === record.userInfo.relation,
  ).name;

  return (
    <>
      <TimelineItem>
        <RecordCard>
          <UserInfo>
            <Avatar src={record.userInfo.avatarUrl} alt="发布者头像" />
            <UserName>{record.userInfo.nickname}</UserName>
            {record.userInfo.relation && (
              <RelationTag $variant={record.userInfo.relation}>
                {releationName}
              </RelationTag>
            )}
            <HeaderRight>
              <RecordTime>{record.time}</RecordTime>
              {record.isMilestone && (
                <MdStars size={vw(18)} style={{ color: "#ff6b8a" }} />
              )}
            </HeaderRight>
          </UserInfo>
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
          <TagWrap>
            {record.tags.map((tag, tIndex) => (
              <RecordTag key={tIndex}>{tag}</RecordTag>
            ))}
          </TagWrap>
          {/* 操作栏 */}
          <Menu record={record} />
        </RecordCard>
      </TimelineItem>

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

export default TimeLineCard;
