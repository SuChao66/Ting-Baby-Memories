import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// 导入图标
import {
  AiOutlineLock,
  AiOutlinePicture,
  AiOutlinePlayCircle,
  AiOutlineSound,
  AiOutlinePauseCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
// 导入 vw 工具函数
import { vw, getAgeAt, formatDate } from "@/utils";
// 导入常量
import { visibilityOptions, RELATION_OPTIONS } from "@/enums";
// 导入通用信封组件
import Envelope from "@/components/Envelope";
// 导入样式
import {
  MessageCardContainer,
  CardHeader,
  CardDate,
  VisibilityTag,
  AgeHint,
  CardContent,
  ImageGrid,
  GridImage,
  FileTypeBadge,
  AudioItem,
  AudioPlay,
  AudioName,
  CardFooter,
  AuthorInfo,
  RelationTag,
  CardImg,
  LetterContent,
  CardActions,
  ActionButton,
} from "./styles";
// 导入类型
import type { IFutureMessage } from "@/interface/futureMessage";
// 导入store
import { useUserStore, useFutureMessageStore } from "@/store";

interface IProps {
  /** 未来寄语记录 */
  item: IFutureMessage;
  /** 宝宝生日（计算解锁那天宝宝的年龄） */
  birthday: string | null;
  /** 删除成功后回调（父组件从列表中移除该条） */
  onDelete?: () => void;
  /** 已解锁的信件（信封文案不同，且不可编辑/删除） */
  unlocked?: boolean;
}

function MessageCard(props: IProps) {
  const { item, birthday, onDelete, unlocked } = props;
  const navigate = useNavigate();
  const userInfo = useUserStore((state) => state.userInfo);
  const { deleteFutureMessage } = useFutureMessageStore((state) => state);

  // 是否已展开完整信件内容
  const [opened, setOpened] = useState(false);
  // 是否正在收起信件（信件内容播放退出动画）
  const [closing, setClosing] = useState(false);
  // 信封是否以倒放方式挂载（收起时拆信动画倒着来一遍）
  const [reverseEnvelope, setReverseEnvelope] = useState(false);
  // 是否显示删除确认弹窗
  const [deleteVisible, setDeleteVisible] = useState(false);

  // 正在播放的音频地址
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 收起定时器，卸载时清理
  const collapseTimerRef = useRef<number>(0);

  useEffect(() => () => clearTimeout(collapseTimerRef.current), []);

  // 当前用户是否为寄语作者（仅作者可编辑/删除）
  const isAuthor = !!userInfo?._id && userInfo._id === item?.userInfo?._id;

  // 可见范围文案
  const visibilityLabel =
    visibilityOptions.find((o) => o.value === item.visibleRoles)?.label ?? "";
  // 创建人关系文案
  const relationName = RELATION_OPTIONS.find(
    (o) => o.value === item.userInfo?.relation,
  )?.name;
  // 解锁那天宝宝的年龄
  const revealAge = getAgeAt(birthday, item.revealDate);

  // 图片/视频附件（九宫格展示）
  const mediaFiles = (item.files || []).filter((f) => f.type !== "AUDIO");
  // 音频附件（列表展示）
  const audioFiles = (item.files || []).filter((f) => f.type === "AUDIO");

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

  // 收起信件：先播放信件内容退出动画，再切回信封并倒放拆信动画（同时停止音频播放）
  const handleCollapse = () => {
    if (closing) return;
    const audio = audioRef.current;
    if (audio && !audio.paused) audio.pause();
    setPlayingUrl(null);
    setClosing(true);
    // 信件收起动画（0.3s）结束后，切回信封并倒放（信纸降下 -> 翻盖合上）
    collapseTimerRef.current = window.setTimeout(() => {
      setReverseEnvelope(true);
      setClosing(false);
      setOpened(false);
    }, 300);
  };

  // 编辑信件
  const handleEdit = () => {
    navigate("/add-future-message", {
      state: {
        item,
      },
    });
  };

  // 确认删除寄语
  const handleDelete = async () => {
    const ok = await deleteFutureMessage(item._id);
    if (ok) {
      Toast.show({
        title: "删除成功",
        icon: "success",
      });
      setDeleteVisible(false);
      onDelete?.();
    }
  };

  // 删除确认弹窗（信封态/展开态共用）
  const deleteDialog = (
    <Dialog
      title="提示"
      visible={deleteVisible}
      onConfirm={handleDelete}
      onCancel={() => setDeleteVisible(false)}
    >
      确认删除该寄语?
    </Dialog>
  );

  // 信封态：翻盖 + 蜡封 + 简略信息，点击拆开
  if (!opened) {
    return (
      <>
        <Envelope
          dateText={`${formatDate(item.revealDate)} ${unlocked ? "已解锁" : "开启"}`}
          senderName={item.userInfo?.nickname || "家人"}
          avatarUrl={item.userInfo?.avatarUrl}
          reverse={reverseEnvelope}
          onOpenComplete={() => {
            setReverseEnvelope(false);
            setOpened(true);
          }}
        />
        {/* 作者操作：编辑 / 删除（已解锁的信件不可操作） */}
        {isAuthor && !unlocked && (
          <CardActions>
            <ActionButton onClick={handleEdit}>
              <AiOutlineEdit size={vw(13)} />
              编辑
            </ActionButton>
            <ActionButton $danger onClick={() => setDeleteVisible(true)}>
              <AiOutlineDelete size={vw(13)} />
              删除
            </ActionButton>
          </CardActions>
        )}
        {deleteDialog}
      </>
    );
  }

  // 信件展开态：完整寄语内容
  return (
    <MessageCardContainer>
      <LetterContent $closing={closing}>
        {/* 解锁日期 + 可见范围 */}
        <CardHeader>
          <CardDate>
            <AiOutlineLock size={vw(14)} />
            {formatDate(item.revealDate)} 解锁
          </CardDate>
          <VisibilityTag>{visibilityLabel}</VisibilityTag>
        </CardHeader>
        {/* 解锁那天宝宝的年龄 */}
        {revealAge ? <AgeHint>那天，宝宝已 {revealAge}</AgeHint> : null}
        {/* 寄语内容 */}
        <CardContent>{item.content}</CardContent>
        {/* 图片 / 视频 */}
        {mediaFiles.length > 0 && (
          <ImageGrid>
            {mediaFiles.map((file, idx) => (
              <GridImage key={idx}>
                {file.type === "IMAGE" ? (
                  <img src={file.url} alt="寄语图片" />
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
          </AudioItem>
        ))}
        {/* 创建人 + 写下时间 */}
        <CardFooter>
          <AuthorInfo>
            <CardImg>
              <img
                src={item.userInfo?.avatarUrl}
                alt={item.userInfo?.nickname}
              />
            </CardImg>
            <span>{item.userInfo?.nickname}</span>
            {relationName && <RelationTag>{relationName}</RelationTag>}
          </AuthorInfo>
          <span>写于：{formatDate(item.createdAt)}</span>
        </CardFooter>
      </LetterContent>
      {/* 操作：收起 / 编辑（仅作者） / 删除（仅作者） */}
      <CardActions $closing={closing}>
        <ActionButton onClick={handleCollapse}>收起信件</ActionButton>
        {isAuthor && !unlocked && (
          <ActionButton onClick={handleEdit}>
            <AiOutlineEdit size={vw(13)} />
            编辑
          </ActionButton>
        )}
        {isAuthor && !unlocked && (
          <ActionButton $danger onClick={() => setDeleteVisible(true)}>
            <AiOutlineDelete size={vw(13)} />
            删除
          </ActionButton>
        )}
      </CardActions>

      {/* 隐藏的音频播放器 */}
      <audio ref={audioRef} onEnded={() => setPlayingUrl(null)} />

      {deleteDialog}
    </MessageCardContainer>
  );
}

export default MessageCard;
