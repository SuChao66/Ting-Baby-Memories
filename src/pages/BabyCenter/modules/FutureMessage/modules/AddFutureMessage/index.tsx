import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// 导入组件
import NavHeader from "@/components/navHeader";
import VideoPreview from "@/baseUI/videoPreview";
// 导入图标
import { IoIosArrowBack } from "react-icons/io";
import {
  AiOutlineClose,
  AiOutlineRight,
  AiOutlinePicture,
  AiOutlinePlayCircle,
  AiOutlineSound,
  AiOutlinePauseCircle,
} from "react-icons/ai";
import { HiOutlinePhotograph } from "react-icons/hi";
// 导入 vw 工具函数
import { vw, getTomorrowDate } from "@/utils";
// 导入工具函数
import {
  getAgeAt,
  formatBirthday,
  compressImage,
  isImage,
  isAudio,
} from "@/utils";
// 导入 store
import { useBabyStore, useFutureMessageStore } from "@/store";
// 导入常量
import {
  visibilityOptions,
  NUMBER,
  ONN_B,
  ALLOWED_CONTENT_TYPES,
} from "@/enums";
// 导入类型
import type { PickerOptions, PickerValue } from "@nutui/nutui-react";
import type { IVisibleRoles } from "@/types";
import type { IFile } from "@/interface/timeline";
import type {
  addFutureMessageReq,
  IFutureMessage,
} from "@/interface/futureMessage";
// 导入上传接口
import { getPresignedUrlApi } from "@/api/upload";
// 导入样式
import {
  AddFutureMessageContainer,
  FormCard,
  FormRow,
  RowLabel,
  RowValue,
  AgeHint,
  MessageTextarea,
  MediaSection,
  MediaGrid,
  MediaItem,
  FileTypeBadge,
  MediaDelete,
  MediaAddBtn,
  MediaAddText,
  AudioItem,
  AudioPlay,
  AudioName,
  AudioDelete,
  SaveButton,
} from "./styles";

function AddFutureMessage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { babyId, item } =
    (location.state as {
      babyId?: string;
      item?: IFutureMessage;
    }) || {};

  // 是否是编辑模式
  const [isEdit] = useState(item !== undefined ? true : false);

  // 初始化store
  const { getBabyInfo } = useBabyStore((state) => state);
  const { addFutureMessage, updateFutureMessage } = useFutureMessageStore(
    (state) => state,
  );

  // 宝宝生日（用于计算所选日期那天宝宝的年龄）
  const [birthday, setBirthday] = useState<string | null>(null);
  // 宝宝昵称
  const [nickName, setNickName] = useState("");
  // 解锁日期
  const [revealDate, setRevealDate] = useState<Date | null>(null);
  // 日期弹层中滚动预览的日期
  const [previewDate, setPreviewDate] = useState<Date | null>(null);
  // 寄语内容
  const [content, setContent] = useState("");
  // 谁可以看
  const [visibleRole, setVisibleRole] = useState<IVisibleRoles>(
    visibilityOptions[0].value,
  );

  // 弹层可见性
  const [dateVisible, setDateVisible] = useState(false);
  const [visibilityVisible, setVisibilityVisible] = useState(false);

  // 附件（图片/视频/音频）
  const [files, setFiles] = useState<IFile[]>([]);
  // 正在播放的音频地址
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  // 图片全屏预览
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  // 视频全屏预览
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 图片/视频附件（九宫格展示）
  const mediaFiles = files.filter((f) => f.type !== "AUDIO");
  // 音频附件（列表展示）
  const audioFiles = files.filter((f) => f.type === "AUDIO");

  useEffect(() => {
    // 编辑模式下，初始化表单数据
    if (isEdit && item) {
      setContent(item.content || "");
      setVisibleRole(item.visibleRoles as IVisibleRoles);
      setRevealDate(new Date(item.revealDate));
      setFiles(
        item.files.map((f) => ({
          type: f.type as IFile["type"],
          url: f.url,
          fileName: f.fileName,
        })),
      );
    }
  }, [isEdit, item]);

  // 获取宝宝生日
  useEffect(() => {
    if (!babyId && !item?.babyId) return;
    getBabyInfo({ id: babyId || item?.babyId || "" }).then((data) => {
      setNickName(data?.nickname || "");
      setBirthday(formatBirthday(data?.birthday) || null);
    });
  }, [babyId, item]);

  // 可见范围文案
  const visibilityLabel =
    visibilityOptions.find((o) => o.value === visibleRole)?.label ?? "";

  // 解锁日期展示文案
  const revealDateText = revealDate
    ? `${revealDate.getFullYear()}年${revealDate.getMonth() + 1}月${revealDate.getDate()}日`
    : "请选择";

  // 已选解锁日期那天宝宝的年龄
  const revealAge = getAgeAt(birthday, formatBirthday(revealDate));
  // 弹层滚动预览那天宝宝的年龄（实时）
  const previewAge = getAgeAt(birthday, formatBirthday(previewDate));
  // 日期弹层标题（滚动时实时带出宝宝年龄）
  const datePickerTitle = previewAge
    ? `那天宝宝${previewAge}`
    : `写给哪一天的${nickName}`;

  // 时间选择确认
  const handleDateConfirm = (
    _options: PickerOptions,
    values: PickerValue[],
  ) => {
    const [Y, M, D] = values.map(Number);
    setRevealDate(new Date(Y, M - 1, D));
    setDateVisible(false);
  };

  // 滚动选择时实时更新预览日期
  const handleDateChange = (_options: PickerOptions, values: PickerValue[]) => {
    const [Y, M, D] = values.map(Number);
    setPreviewDate(new Date(Y, M - 1, D));
  };

  // 打开附件选择器
  const openFilePicker = () => {
    fileRef.current?.click();
  };

  // 选择附件（图片压缩后上传，视频/音频直接上传）
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (files.length >= 9) {
      Toast.show({ title: "最多添加 9 个附件", icon: "warn" });
      return;
    }

    // 检查文件类型是否在允许的范围内
    if (!ALLOWED_CONTENT_TYPES.includes(file.type)) {
      Toast.show({ title: "请选择图片、视频或音频文件", icon: "warn" });
      return;
    }

    // 图片 10MB、音频 50MB、视频 100MB
    const maxSize = isImage(file.type)
      ? NUMBER.TEN
      : isAudio(file.type)
        ? NUMBER.FIFTY
        : NUMBER.HUNDRED;
    if (file.size > maxSize * ONN_B * ONN_B) {
      Toast.show({
        title: `${
          isImage(file.type) ? "图片" : isAudio(file.type) ? "音频" : "视频"
        }不能超过 ${maxSize}MB`,
        icon: "warn",
      });
      return;
    }

    // 图片做压缩处理，视频/音频直接上传
    let uploadFile = file;
    if (isImage(file.type)) {
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
      setFiles((prev) => [
        ...prev,
        {
          type: isImage(file.type)
            ? "IMAGE"
            : isAudio(file.type)
              ? "AUDIO"
              : "VIDEO",
          url: data.accessUrl,
          fileName: file.name,
        },
      ]);
    } catch {
      Toast.show({ title: "上传失败，请重试", icon: "fail" });
    } finally {
      Toast.clear();
    }
    e.target.value = "";
  };

  // 删除附件
  const handleDeleteFile = (file: IFile) => {
    setFiles((prev) => prev.filter((f) => f !== file));
  };

  // 播放/暂停音频
  const handleAudioToggle = (url: string) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playingUrl === url && !audio.paused) {
      audio.pause();
      setPlayingUrl(null);
      return;
    }
    audio.src = url;
    audio.play().catch(() => setPlayingUrl(null));
    setPlayingUrl(url);
  };

  // 点击附件预览
  const handlePreview = (file: IFile) => {
    if (file.type === "VIDEO") {
      setVideoPreviewUrl(file.url);
    } else {
      // 计算在图片列表中的索引
      const imageIndex = mediaFiles
        .slice(0, mediaFiles.indexOf(file))
        .filter((f) => f.type === "IMAGE").length;
      setPreviewIndex(imageIndex);
      setPreviewVisible(true);
    }
  };

  // 保存
  const handleSubmit = async () => {
    if (!content) {
      Toast.show({ title: "请输入寄语内容", icon: "warn" });
      return;
    }
    if (!revealDate) {
      Toast.show({ title: "请选择解锁日期", icon: "warn" });
      return;
    }
    const params: addFutureMessageReq = {
      babyId: (babyId ? babyId : item?.babyId) ?? "",
      content,
      revealDate,
      files: files,
      visibleRoles: visibleRole,
    };
    if (isEdit && item?._id) {
      params.id = item._id;
    }
    const requestMethod = isEdit ? updateFutureMessage : addFutureMessage;
    const ok = await requestMethod(params);
    if (ok) {
      Toast.show({
        title: isEdit ? "更新寄语成功" : "新增寄语成功",
        icon: "success",
      });
      navigate(-1);
    } else {
      Toast.show({
        title: isEdit ? "更新寄语失败" : "新增寄语失败",
        icon: "fail",
      });
    }
  };

  return (
    <>
      <NavHeader title="新增寄语" back={<IoIosArrowBack size={22} />} />
      <AddFutureMessageContainer>
        <FormCard>
          {/* 解锁日期 */}
          <FormRow
            onClick={() => {
              setPreviewDate(revealDate ?? new Date());
              setDateVisible(true);
            }}
          >
            <RowLabel>写给哪一天的{nickName}？</RowLabel>
            <RowValue $active={!!revealDate}>
              {revealDateText}
              <AiOutlineRight size={vw(14)} color="#ccc" />
            </RowValue>
          </FormRow>
          {/* 选中日期那天宝宝的年龄 */}
          {revealAge ? (
            <AgeHint>
              那天，{nickName} 已 {revealAge}
            </AgeHint>
          ) : null}

          {/* 寄语内容 */}
          <MessageTextarea
            placeholder={`写下想对${nickName}说的话。`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* 附件（图片/视频/音频） */}
          <MediaSection>
            <MediaGrid>
              {mediaFiles.map((file) => (
                <MediaItem key={file.url} onClick={() => handlePreview(file)}>
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
                  <MediaDelete
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFile(file);
                    }}
                  >
                    <AiOutlineClose color="#fff" size={vw(12)} />
                  </MediaDelete>
                </MediaItem>
              ))}
              {files.length < 9 && (
                <MediaAddBtn onClick={openFilePicker}>
                  <HiOutlinePhotograph color="#ff9eb5" size={vw(24)} />
                  <MediaAddText>{files.length}/9</MediaAddText>
                </MediaAddBtn>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*, video/*, audio/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e)}
              />
            </MediaGrid>
            {/* 音频附件 */}
            {audioFiles.map((file, index) => (
              <AudioItem key={file.url}>
                <AudioPlay onClick={() => handleAudioToggle(file.url)}>
                  {playingUrl === file.url ? (
                    <AiOutlinePauseCircle size={vw(20)} color="#ff6b8a" />
                  ) : (
                    <AiOutlineSound size={vw(20)} color="#ff6b8a" />
                  )}
                </AudioPlay>
                <AudioName>{file.fileName || `语音寄语${index + 1}`}</AudioName>
                <AudioDelete onClick={() => handleDeleteFile(file)}>
                  <AiOutlineClose size={vw(14)} color="#999" />
                </AudioDelete>
              </AudioItem>
            ))}
          </MediaSection>

          {/* 谁可以看 */}
          <FormRow onClick={() => setVisibilityVisible(true)}>
            <RowLabel>谁可以看</RowLabel>
            <RowValue>
              {visibilityLabel}
              <AiOutlineRight size={vw(14)} color="#ccc" />
            </RowValue>
          </FormRow>
        </FormCard>
      </AddFutureMessageContainer>

      {/* 底部保存 */}
      <SaveButton onClick={handleSubmit}>保存</SaveButton>

      {/* 解锁日期选择（仅可选未来日期） */}
      <DatePicker
        title={datePickerTitle}
        visible={dateVisible}
        type="date"
        showChinese
        startDate={getTomorrowDate()}
        endDate={new Date(new Date().getFullYear() + 20, 11, 31)}
        onConfirm={handleDateConfirm}
        onChange={handleDateChange}
        onCancel={() => setDateVisible(false)}
        onClose={() => setDateVisible(false)}
      />

      {/* 谁可以看 */}
      <ActionSheet
        visible={visibilityVisible}
        options={visibilityOptions.map((o) => ({ name: o.label }))}
        cancelText="取消"
        onSelect={(_item, index) => {
          setVisibleRole(visibilityOptions[index].value);
          setVisibilityVisible(false);
        }}
        onCancel={() => setVisibilityVisible(false)}
      />

      {/* 隐藏的音频播放器 */}
      <audio ref={audioRef} onEnded={() => setPlayingUrl(null)} />

      {/* 图片全屏预览 */}
      <ImagePreview
        visible={previewVisible}
        images={mediaFiles
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

export default AddFutureMessage;
