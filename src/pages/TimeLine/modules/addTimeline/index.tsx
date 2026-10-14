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
import {
  vw,
  getTodayDate,
  compressImage,
  getExifData,
  batchUploadFiles,
} from "@/utils";
// 导入组件
import NavHeader from "@/components/navHeader";
import VideoPreview from "@/baseUI/videoPreview";
import UploadProgress from "@/baseUI/uploadProgress";
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
  FileTypeBadge,
} from "./styles";
// 导入store
import { useTagStore, useBabyStore, useTimelineStore } from "@/store";
// 导入类型
import type { PickerOptions, PickerValue } from "@nutui/nutui-react";
import type { IFile } from "@/interface/timeline";
import type { IVisibleRoles } from "@/types";
// 导入常量
import {
  visibilityOptions,
  NUMBER,
  ONN_B,
  TIME_LINE_VISIBLE_ROLES,
} from "@/enums";

// 模块级缓存：保存表单状态，避免从标签页返回时数据丢失
let formCache: {
  cacheKey: string;
  /** 导航会话标识：仅同一会话（去标签页后返回）才恢复草稿 */
  locationKey: string;
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
  // 从 location.state?.isMilestone 判断是否为大事件
  const isMilestoneValue = location.state?.isMilestone;

  const { year, month, day, hour, minute } = getTodayDate();
  const { babyId, setBabyId } = useBabyStore((state) => state);
  const imageRef = useRef<HTMLInputElement>(null);
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
  const [isMilestone, setIsMilestone] = useState(!!isMilestoneValue);

  // 谁可以看
  const [visibleRoles, setVisibilityRoles] = useState<IVisibleRoles>(
    TIME_LINE_VISIBLE_ROLES.FAMILY,
  );

  // 弹窗可见性
  const [timelineDateVisible, setTimelineDateVisible] = useState(false);
  const [visibilityVisible, setVisibilityVisible] = useState(false);

  // 全屏预览
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

  // 上传进度弹框
  const [uploadVisible, setUploadVisible] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadTitle, setUploadTitle] = useState("上传中...");

  // 获取记录详情 / 从缓存恢复
  useEffect(() => {
    const cacheKey = timelineId || "add";
    // 从标签页返回：命中同一导航会话的缓存则直接恢复
    if (
      formCache &&
      formCache.cacheKey === cacheKey &&
      formCache.locationKey === location.key
    ) {
      setContent(formCache.content);
      setFiles(formCache.files);
      setDateTime(formCache.datetime);
      setIsMilestone(formCache.isMilestone);
      setVisibilityRoles(formCache.visibleRoles);
      return;
    }
    // 全新进入：清空上次遗留的已选标签
    setSelectedTags([]);
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
      locationKey: location.key,
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

  // 选择文件（支持多选）
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    // 立即重置，保证连续两次选择同一批文件也能触发 change
    e.target.value = "";
    if (!selected.length) return;

    // 1. 数量上限：按剩余槽位裁剪
    const remaining = NUMBER.NINE - files.length;
    let validList = selected;
    if (validList.length > remaining) {
      validList = validList.slice(0, remaining);
      Toast.show({
        title: `最多上传 ${NUMBER.NINE} 个文件，已保留前 ${remaining} 个`,
        icon: "warn",
      });
    }

    // 2. 逐个校验类型与大小：图片 10MB，视频 100MB
    const skippedCount = validList.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      const maxSize = isImage ? NUMBER.TEN : isVideo ? NUMBER.HUNDRED : 0;
      if (!maxSize || file.size > maxSize * ONN_B * ONN_B) return true;
      return false;
    }).length;
    validList = validList.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      const maxSize = isImage ? NUMBER.TEN : isVideo ? NUMBER.HUNDRED : 0;
      return !!maxSize && file.size <= maxSize * ONN_B * ONN_B;
    });
    if (!validList.length) {
      Toast.show({ title: "请选择符合要求的图片或视频文件", icon: "warn" });
      return;
    }
    if (skippedCount) {
      Toast.show({
        title: `${skippedCount} 个文件类型不支持或超过大小限制，已忽略`,
        icon: "warn",
      });
    }

    // 3. 用第一张图片的拍摄时间回填（须在压缩前读取，压缩会丢失 EXIF）
    const firstImage = validList.find((f) => f.type.startsWith("image/"));
    if (firstImage) {
      const takenTime = await getExifData(firstImage);
      if (takenTime) setDateTime(takenTime);
    }

    // 4. 图片串行压缩避免内存压力，视频直接上传；压缩失败用原图
    // 弹出自定义进度遮罩，期间阻断页面交互
    setUploadVisible(true);
    setUploadPercent(0);
    setUploadTitle("正在处理图片...");
    const uploadList: File[] = [];
    for (const file of validList) {
      if (file.type.startsWith("image/")) {
        try {
          uploadList.push(await compressImage(file, 0.8));
        } catch {
          uploadList.push(file);
        }
      } else {
        uploadList.push(file);
      }
    }

    // 5. 并发上传，进度同步到弹框
    setUploadTitle(`上传中 0/${uploadList.length}`);
    const results = await batchUploadFiles(
      uploadList,
      (percent, done, total) => {
        setUploadPercent(percent);
        setUploadTitle(`上传中 ${done}/${total}`);
      },
    );

    // 6. 成功的追加到列表，失败的汇总提示
    const uploaded: IFile[] = [];
    for (const result of results) {
      if (result.status === "fulfilled") uploaded.push(result.value);
    }
    if (uploaded.length) setFiles((prev) => [...prev, ...uploaded]);
    // 关闭进度弹框后再展示结果
    setTimeout(() => {
      // 延时隐藏进度弹框
      setUploadVisible(false);
    }, 1000);

    const failCount = uploadList.length - uploaded.length;
    if (failCount) {
      Toast.show({
        title: `${uploaded.length ? `成功 ${uploaded.length} 个，` : ""}失败 ${failCount} 个，请重试`,
        icon: "fail",
      });
    } else {
      Toast.show({ title: "上传成功", icon: "success" });
    }
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
                multiple
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
          <Switch
            disabled={isMilestoneValue}
            checked={isMilestone}
            onChange={(v) => setIsMilestone(v)}
          />
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

      {/* 上传进度弹框 */}
      <UploadProgress
        visible={uploadVisible}
        percent={uploadPercent}
        title={uploadTitle}
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
