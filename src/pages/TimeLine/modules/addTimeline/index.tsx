import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
import {
  AiOutlineClose,
  AiOutlineRight,
  AiOutlineStar,
  AiOutlineEye,
  AiOutlinePlayCircle,
  AiOutlinePicture,
} from "react-icons/ai";
import { CiShoppingTag } from "react-icons/ci";
import { HiOutlinePhotograph } from "react-icons/hi";
// 导入 vw 工具函数
import { vw, getTodayDate, compressImage } from "@/utils";
// 导入组件
import NavHeader from "@/components/navHeader";
import VideoPreview from "@/baseUI/videoPreview";
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
  TagItem,
  TagClose,
  TimeRow,
  TimeLabel,
  TimeValue,
  PublishButton,
  OptionRow,
  OptionLabel,
  OptionRight,
  OptionValue,
  SwitchWrapper,
  FileTypeBadge,
} from "./styles";
// 导入store
import { useTagStore, useBabyStore, useTimelineStore } from "@/store";
// 导入类型
import type { PickerOptions, PickerValue } from "@nutui/nutui-react";
import type { IFile } from "@/interface/timeline";
import type { IVisibleRoles } from "@/types";
// 导入上传接口
import { getPresignedUrlApi } from "@/api/upload";
// 导入常量
import { visibilityOptions, NUMBER, ONN_B } from "@/enums";

// 模块级缓存：保存表单状态，避免从标签页返回时数据丢失
let formCache: {
  cacheKey: string;
  content: string;
  files: IFile[];
  datetime: Date;
  isMilestone: boolean;
  visibleRoles: IVisibleRoles;
} | null = null;

function TimelineForm() {
  const navigate = useNavigate();
  const location = useLocation();
  // 通过 location.state?.id 判断是新增还是编辑模式
  const timelineId = location.state?.id;
  const isEditMode = !!timelineId;

  const { year, month, day, hour, minute } = getTodayDate();
  const { babyId, setBabyId } = useBabyStore((state) => state);
  const imageRef = useRef();
  // 已选择的标签
  const { selectedTags, setSelectedTags } = useTagStore((state) => state);
  const { addTimeline, editTimeline, getTimeLineInfo } = useTimelineStore(
    (state) => state,
  );
  // 内容
  const [content, setContent] = useState("");
  // 文件列表
  const [files, setFiles] = useState<IFile[]>([]);
  // 日期时间
  const [datetime, setDateTime] = useState(
    new Date(year, month - 1, day, hour, minute),
  );
  // 是否标记为大事件
  const [isMilestone, setIsMilestone] = useState(false);
  // 谁可以看
  const [visibleRoles, setVisibilityRoles] = useState<IVisibleRoles>("public");

  // 弹窗可见性
  const [timelineDateVisible, setTimelineDateVisible] = useState(false);
  const [visibilityVisible, setVisibilityVisible] = useState(false);

  // 全屏预览
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

  // 获取记录详情 / 从缓存恢复
  useEffect(() => {
    const cacheKey = timelineId || "add";
    // 从标签页返回：命中缓存则直接恢复
    if (formCache && formCache.cacheKey === cacheKey) {
      setContent(formCache.content);
      setFiles(formCache.files);
      setDateTime(formCache.datetime);
      setIsMilestone(formCache.isMilestone);
      setVisibilityRoles(formCache.visibleRoles);
      return;
    }
    // 编辑模式首次进入：请求数据
    if (!isEditMode) return;
    getTimeLineInfo(timelineId).then((data) => {
      setContent(data.content);
      setIsMilestone(data.isMilestone);
      setVisibilityRoles(data.visibleRoles as any);
      setFiles(data.files);
      setSelectedTags(data.tags);
      const { year, month, day, hour, minute } = getTodayDate(data.publishTime);
      setDateTime(new Date(year, month - 1, day, hour, minute));
      setBabyId(data.babyId);
    });
  }, []);

  // 同步表单状态到缓存
  useEffect(() => {
    formCache = {
      cacheKey: timelineId || "add",
      content,
      files,
      datetime,
      isMilestone,
      visibleRoles,
    };
  }, [content, files, datetime, isMilestone, visibleRoles]);

  // 点击文件预览
  const handlePreview = (index: number) => {
    const file = files[index];
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

  // 可见范围
  const visibilityLabel = (v: string) =>
    visibilityOptions.find((o) => o.value === v)?.label || "公开";

  // 时间选择确认
  const handleTimelineDataConfirm = (
    _options: PickerOptions,
    values: PickerValue[],
  ) => {
    const [Y, M, D, h, m] = values.map(Number);
    if (
      Number.isNaN(Y) ||
      Number.isNaN(M) ||
      Number.isNaN(D) ||
      Number.isNaN(h) ||
      Number.isNaN(m)
    )
      return;
    setDateTime(new Date(Y, M - 1, D, h, m));
    setTimelineDateVisible(false);
  };

  // 打开图片选择
  const openImagePicker = () => {
    if (imageRef.current) {
      (imageRef.current as HTMLInputElement).click();
    }
  };

  // 选择文件
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    if (!isImage && !isVideo) {
      Toast.show({ title: "请选择图片或视频文件", icon: "warn" });
      return;
    }

    // 图片限制 10MB，视频限制 100MB
    const maxSize = isImage ? NUMBER.TEN : NUMBER.HUNDRED;
    if (file.size > maxSize * ONN_B * ONN_B) {
      Toast.show({
        title: `${isImage ? "图片" : "视频"}不能超过 ${maxSize}MB`,
        icon: "warn",
      });
      return;
    }

    // 图片做压缩处理，视频直接上传
    let uploadFile = file;
    if (isImage) {
      try {
        uploadFile = await compressImage(file, 0.8);
      } catch {
        console.log("压缩失败，使用原图");
      }
    }

    Toast.show({ title: "上传中...", icon: "loading", duration: 0 });
    try {
      const { data } = await getPresignedUrlApi({
        filename: uploadFile.name,
        contentType: uploadFile.type,
      });
      const res = await fetch(data.uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": uploadFile.type,
          "x-cos-acl": "public-read",
        },
        body: uploadFile,
      });
      if (!res.ok) throw new Error("上传失败");
      setFiles([
        ...files,
        { type: isImage ? "IMAGE" : "VIDEO", url: data.accessUrl },
      ]);
    } catch {
      Toast.show({ title: "上传失败，请重试", icon: "fail" });
    } finally {
      Toast.clear();
    }
    e.target.value = "";
  };

  // 删除文件
  const handleDeleteFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // 删除标签
  const handleDeleteTag = (name: string) => {
    const newTags = selectedTags.filter((tag) => tag !== name);
    setSelectedTags(newTags);
  };

  // 跳转进入标签管理
  const handleToTagManager = () => {
    navigate("/tag");
  };

  // 发布/更新记录
  const handPublishTimeline = async () => {
    if (!content.trim()) {
      Toast.show({
        title: "请输入内容",
        icon: "fail",
      });
      return;
    }
    if (selectedTags.length > 3) {
      Toast.show({
        title: "最多选择三个标签",
        icon: "fail",
      });
      return;
    }
    const params = {
      ...(isEditMode ? { id: timelineId } : {}),
      babyId,
      content,
      files,
      tags: selectedTags,
      publishTime: datetime,
      isMilestone,
      visibleRoles,
    };
    const success = isEditMode
      ? await editTimeline(params)
      : await addTimeline(params);
    if (success) {
      // 清除缓存
      formCache = null;
      Toast.show({
        title: isEditMode ? "更新成功" : "发布成功",
        icon: "success",
      });
      navigate(-1);
    }
  };

  return (
    <>
      <NavHeader
        title={isEditMode ? "编辑记录" : "发布记录"}
        back={<IoIosArrowBack size={22} />}
      />
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
          <ImageSection>
            <ImageGrid>
              {files.map((file, index) => (
                <ImageItem
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreview(index);
                  }}
                >
                  {file.type === "VIDEO" ? (
                    <video src={file.url} muted />
                  ) : (
                    <img src={file.url} alt="" />
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
                  <ImageDelete
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFile(index);
                    }}
                  >
                    <AiOutlineClose color="#fff" size={vw(12)} />
                  </ImageDelete>
                </ImageItem>
              ))}
              {files.length < 9 && (
                <ImageAddBtn onClick={openImagePicker}>
                  <HiOutlinePhotograph color="#ff9eb5" size={vw(24)} />
                  <ImageAddText>{files.length}/9</ImageAddText>
                </ImageAddBtn>
              )}
              <input
                ref={imageRef}
                type="file"
                accept="image/*, video/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e)}
              />
            </ImageGrid>
            {/* 标签选择 */}
            <TagSection>
              {selectedTags.length > 0 &&
                selectedTags.map((tag, index) => (
                  <TagItem key={index}>
                    {tag}
                    <TagClose onClick={() => handleDeleteTag(tag)}>
                      <AiOutlineClose size={vw(12)} />
                    </TagClose>
                  </TagItem>
                ))}
              <TagHeader onClick={handleToTagManager}>
                <CiShoppingTag />
                <TagTitle>标签</TagTitle>
              </TagHeader>
            </TagSection>
          </ImageSection>
        </ContentCard>

        {/* 是否标记为大事件 */}
        <OptionRow>
          <OptionLabel>
            <AiOutlineStar
              size={vw(16)}
              color="#ff9eb5"
              style={{ marginRight: vw(6), verticalAlign: "middle" }}
            />
            标记为大事件
          </OptionLabel>
          <SwitchWrapper
            $on={isMilestone}
            onClick={() => setIsMilestone((v) => !v)}
          >
            <span />
          </SwitchWrapper>
        </OptionRow>

        {/* 谁可以看 */}
        <OptionRow onClick={() => setVisibilityVisible(true)}>
          <OptionLabel>
            <AiOutlineEye
              size={vw(16)}
              color="#ff9eb5"
              style={{ marginRight: vw(6), verticalAlign: "middle" }}
            />
            谁可以看
          </OptionLabel>
          <OptionRight>
            <OptionValue $active>{visibilityLabel(visibleRoles)}</OptionValue>
            <AiOutlineRight size={vw(14)} color="#ccc" />
          </OptionRight>
        </OptionRow>

        {/* 日期时间选择 */}
        <TimeRow onClick={() => setTimelineDateVisible(true)}>
          <TimeLabel>记录时间</TimeLabel>
          <TimeValue>{datetime.toLocaleString() || "请选择"}</TimeValue>
          <AiOutlineRight size={vw(14)} color="#ccc" />
        </TimeRow>

        {/* 发布按钮 */}
        <PublishButton onClick={handPublishTimeline}>
          {isEditMode ? "保存" : "发布"}
        </PublishButton>
      </AddTimelineContainer>

      {/* 发布时间 */}
      <DatePicker
        title="选择时间"
        type="datetime"
        showChinese
        visible={timelineDateVisible}
        startDate={new Date(1920, 0, 1)}
        endDate={new Date()}
        value={datetime || new Date(year, month, day)}
        onConfirm={(options, value) =>
          handleTimelineDataConfirm(options, value)
        }
        onCancel={() => setTimelineDateVisible(false)}
        onClose={() => setTimelineDateVisible(false)}
      />

      {/* 谁可以看 */}
      <ActionSheet
        visible={visibilityVisible}
        options={visibilityOptions.map((o) => ({ name: o.label }))}
        cancelText="取消"
        onSelect={(_item, index) => {
          setVisibilityRoles(visibilityOptions[index].value);
          setVisibilityVisible(false);
        }}
        onCancel={() => setVisibilityVisible(false)}
      />

      {/* 图片全屏预览 */}
      <ImagePreview
        visible={previewVisible}
        images={files
          .filter((f) => f.type === "IMAGE")
          .map((f) => ({ src: f.url }))}
        defaultValue={previewIndex}
        onClose={() => setPreviewVisible(false)}
      />

      {/* 视频全屏预览 */}
      {videoPreviewUrl && (
        <VideoPreview
          videoPreviewUrl={videoPreviewUrl}
          setVideoPreviewUrl={setVideoPreviewUrl}
        />
      )}
    </>
  );
}

export default TimelineForm;
