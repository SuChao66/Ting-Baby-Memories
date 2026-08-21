import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { HiOutlinePhotograph } from "react-icons/hi";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入组件
import NavHeader from "@/components/navHeader";
// 导入样式组件
import {
  AddTimelineContainer,
  ContentCard,
  ContentTextarea,
  ImageSection,
  ImageGrid,
  ImageItem,
  ImageDelete,
  ImageAddBtn,
  ImageAddText,
  TagSection,
  TagHeader,
  TagTitle,
  TagAddBtn,
  TagList,
  TagItem,
  TagClose,
  TimeRow,
  TimeLabel,
  TimeValue,
  PublishButton,
} from "./styles";

function AddTimeLine() {
  // 内容
  const [content, setContent] = useState("");
  // 图片列表
  const [images, setImages] = useState<string[]>([]);
  // 标签列表
  const [tags, setTags] = useState<string[]>(["第一次", "日常"]);
  // 日期时间
  const [datetime] = useState("");

  // 删除图片
  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 删除标签
  const handleDeleteTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <NavHeader title="发布记录" back={<IoIosArrowBack size={22} />} />
      <AddTimelineContainer>
        {/* 内容输入 */}
        <ContentCard>
          <ContentTextarea
            placeholder="记录宝宝今天的精彩瞬间..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </ContentCard>

        {/* 图片上传 */}
        <ContentCard>
          <ImageSection style={{ padding: 0 }}>
            <ImageGrid>
              {images.map((img, index) => (
                <ImageItem key={index}>
                  <img src={img} alt="" />
                  <ImageDelete onClick={() => handleDeleteImage(index)}>
                    <AiOutlineClose color="#fff" size={vw(12)} />
                  </ImageDelete>
                </ImageItem>
              ))}
              {images.length < 9 && (
                <ImageAddBtn>
                  <HiOutlinePhotograph color="#ff9eb5" size={vw(28)} />
                  <ImageAddText>{images.length}/9</ImageAddText>
                </ImageAddBtn>
              )}
            </ImageGrid>
          </ImageSection>
        </ContentCard>

        {/* 标签选择 */}
        <TagSection>
          <TagHeader>
            <TagTitle>标签</TagTitle>
            <TagAddBtn>
              <AiOutlinePlus size={vw(14)} />
              添加标签
            </TagAddBtn>
          </TagHeader>
          <TagList>
            {tags.map((tag, index) => (
              <TagItem key={index}>
                {tag}
                <TagClose onClick={() => handleDeleteTag(index)}>
                  <AiOutlineClose size={vw(12)} />
                </TagClose>
              </TagItem>
            ))}
          </TagList>
        </TagSection>

        {/* 日期时间选择 */}
        <TimeRow onClick={() => {}}>
          <TimeLabel>日期时间</TimeLabel>
          <TimeValue>{datetime || "请选择"}</TimeValue>
          <AiOutlinePlus
            size={vw(14)}
            color="#ccc"
            style={{ transform: "rotate(45deg)" }}
          />
        </TimeRow>

        {/* 发布按钮 */}
        <PublishButton onClick={() => {}}>发布</PublishButton>
      </AddTimelineContainer>
    </>
  );
}

export default AddTimeLine;
