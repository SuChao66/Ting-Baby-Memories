import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// 导入组件
import NavHeader from "@/components/navHeader";
import VideoPreview from "@/baseUI/videoPreview";
// 导入图标
import { IoIosArrowBack, IoIosSend } from "react-icons/io";
import {
  AiOutlinePlayCircle,
  AiOutlinePicture,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineMessage,
} from "react-icons/ai";
// 导入 vw 工具函数
import { vw, formatDate, formatTime, getAgeAt } from "@/utils";
// 导入样式
import {
  DetailContainer,
  RecordCard,
  UserInfo,
  Avatar,
  UserName,
  RelationTag,
  MetaRow,
  CardDate,
  AgeTag,
  CardContent,
  ImageGrid,
  GridImage,
  FileTypeBadge,
  TagWrap,
  RecordTag,
  CommentSection,
  CommentTitle,
  CommentItem,
  CommentAvatar,
  CommentBody,
  CommentHeader,
  CommentName,
  CommentTime,
  CommentContent,
  ActionBar,
  ActionButton,
  CommentInputWrap,
  CommentInput,
} from "./styles";
// 导入接口
import { getBabyInfoApi } from "@/api";
// 导入store
import { useUserStore, useTimelineStore } from "@/store";
// 导入常量
import { RELATION_OPTIONS } from "@/enums";
// 导入类型
import type { ITimelineItem, IFile, IComment } from "@/interface/timeline";

function MileStoneDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item as ITimelineItem;

  const { userInfo } = useUserStore((state) => state);
  const { getTimeLineInfo, deleteTimeLine, publishComment } = useTimelineStore(
    (state) => state,
  );

  // 宝宝生日（计算大事记发生时的月龄）
  const [birthday, setBirthday] = useState<string | null>(null);

  // 详情数据（编辑返回后重新拉取，保证最新；详情接口不返回 userInfo，沿用列表传入的）
  const [detail, setDetail] = useState<ITimelineItem>(item);

  // 评论列表（发布成功后本地追加）
  const [comments, setComments] = useState<IComment[]>(item.comments ?? []);
  // 评论内容
  const [commentContent, setCommentContent] = useState("");
  // 删除确认弹窗
  const [deleteVisible, setDeleteVisible] = useState(false);
  // 评论输入框（点击「评论」按钮时自动聚焦）
  const commentInputRef = useRef<HTMLInputElement>(null);

  // 是否为发布者本人（编辑/删除仅本人可见）
  const isOwner = detail.userInfo?._id === userInfo?._id;

  // 全屏预览
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [previewFiles, setPreviewFiles] = useState<IFile[]>([]);

  // 获取宝宝生日 + 重新拉取详情（编辑后返回时保证数据最新）
  useEffect(() => {
    getBabyInfoApi({ id: item.babyId }).then(({ code, data }) => {
      if (code === 0 && data?.birthday) {
        setBirthday(String(data.birthday));
      }
    });
    getTimeLineInfo(item._id).then((data) => {
      if (data) {
        // 详情接口不返回发布者信息，保留列表传入的 userInfo
        setDetail({ ...data, userInfo: item.userInfo });
        setComments(data.comments ?? []);
      }
    });
  }, []);

  // 点击文件预览
  const handlePreview = (files: IFile[], index: number) => {
    const file = files[index];
    setPreviewFiles(files);
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
    (o) => o.value === detail.userInfo?.relation,
  )?.name;

  // 编辑记录（复用编辑页）
  const handleEdit = () => {
    navigate("/edit-timeline", {
      state: {
        id: detail._id,
      },
    });
  };

  // 删除记录
  const handleDelete = async () => {
    const ok = await deleteTimeLine(detail._id);
    if (ok) {
      Toast.show({
        title: "删除成功",
        icon: "success",
      });
      setDeleteVisible(false);
      // 返回列表页
      navigate(-1);
    }
  };

  // 发表评论
  const handlePublishComment = async () => {
    if (!commentContent.trim()) return;
    const params = {
      id: detail._id,
      comment: {
        releation: detail.userInfo?.relation ?? "",
        content: commentContent,
      },
    };
    const ok = await publishComment(params);
    if (ok) {
      Toast.show({
        title: "发布成功",
        icon: "success",
      });
      // 本地追加评论，无需重新请求
      setComments((prev) => [
        ...prev,
        {
          content: commentContent,
          releation: detail.userInfo?.relation,
          createdAt: new Date().toISOString(),
          userInfo: {
            nickname: userInfo?.nickname ?? "",
            avatarUrl: userInfo?.avatarUrl ?? "",
            releation: detail.userInfo?.relation ?? "",
          },
        },
      ]);
      setCommentContent("");
      // 收起键盘
      commentInputRef.current?.blur();
    }
  };

  return (
    <>
      <NavHeader title="大事记详情" back={<IoIosArrowBack size={22} />} />
      <DetailContainer>
        <RecordCard>
          {/* 发布者信息 */}
          <UserInfo>
            <Avatar src={detail.userInfo?.avatarUrl} alt="发布者头像" />
            <UserName>{detail.userInfo?.nickname}</UserName>
            {detail.userInfo?.relation && (
              <RelationTag $variant={detail.userInfo.relation}>
                {releationName}
              </RelationTag>
            )}
          </UserInfo>
          {/* 日期 + 月龄 */}
          <MetaRow>
            <CardDate>{formatDate(detail.publishTime)}</CardDate>
            <AgeTag>{getAgeAt(birthday, detail.publishTime)}</AgeTag>
          </MetaRow>
          {/* 记录内容 */}
          <CardContent>{detail.content}</CardContent>
          {/* 图片 / 视频 */}
          {detail.files && detail.files.length > 0 && (
            <ImageGrid>
              {detail.files.map((file, idx) => (
                <GridImage
                  key={idx}
                  onClick={() => handlePreview(detail.files, idx)}
                >
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
          {/* 标签 */}
          {detail.tags && detail.tags.length > 0 && (
            <TagWrap>
              {detail.tags.map((tag, idx) => (
                <RecordTag key={idx}>{tag}</RecordTag>
              ))}
            </TagWrap>
          )}
          {/* 操作栏 */}
          <ActionBar>
            {isOwner && (
              <>
                <ActionButton onClick={handleEdit}>
                  <AiOutlineEdit size={vw(14)} />
                  编辑
                </ActionButton>
                <ActionButton onClick={() => setDeleteVisible(true)}>
                  <AiOutlineDelete size={vw(14)} />
                  删除
                </ActionButton>
              </>
            )}
            <ActionButton onClick={() => commentInputRef.current?.focus()}>
              <AiOutlineMessage size={vw(14)} />
              评论
            </ActionButton>
          </ActionBar>
          {/* 评论 */}
          {comments.length > 0 && (
            <CommentSection>
              <CommentTitle>评论 {comments.length}</CommentTitle>
              {comments.map((comment, idx) => (
                <CommentItem key={idx}>
                  <CommentAvatar
                    src={comment.userInfo?.avatarUrl}
                    alt="评论者头像"
                  />
                  <CommentBody>
                    <CommentHeader>
                      <CommentName>{comment.userInfo?.nickname}</CommentName>
                      {comment.userInfo?.releation && (
                        <RelationTag $variant={comment.userInfo.releation}>
                          {
                            RELATION_OPTIONS.find(
                              (o) => o.value === comment.userInfo?.releation,
                            )?.name
                          }
                        </RelationTag>
                      )}
                      {comment.createdAt && (
                        <CommentTime>
                          {formatDate(comment.createdAt)}{" "}
                          {formatTime(comment.createdAt)}
                        </CommentTime>
                      )}
                    </CommentHeader>
                    <CommentContent>{comment.content}</CommentContent>
                  </CommentBody>
                </CommentItem>
              ))}
            </CommentSection>
          )}
          {/* 删除确认弹窗 */}
          <Dialog
            title="提示"
            visible={deleteVisible}
            onConfirm={handleDelete}
            onCancel={() => setDeleteVisible(false)}
          >
            确认删除该大事记?
          </Dialog>
        </RecordCard>
      </DetailContainer>

      {/* 评论输入区（固定底部） */}
      <CommentInputWrap>
        <CommentInput
          ref={commentInputRef}
          value={commentContent}
          onChange={(val) => setCommentContent(val.target.value)}
          placeholder="写下你的评论..."
        />
        <IoIosSend
          size={vw(22)}
          style={{ color: "#ff6b8a" }}
          onClick={handlePublishComment}
        />
      </CommentInputWrap>

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
        images={previewFiles
          .filter((f) => f.type === "IMAGE")
          .map((f) => ({ src: f.url }))}
        defaultValue={previewIndex}
        onClose={() => setPreviewVisible(false)}
      />
    </>
  );
}

export default MileStoneDetail;
