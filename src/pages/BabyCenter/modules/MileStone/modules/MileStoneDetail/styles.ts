import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";
// 导入常量
import { RELATION_COLORS } from "@/enums";

/** 详情页滚动容器 */
export const DetailContainer = styled.div`
  height: 100%;
  overflow-y: hidden;
  /* 底部留出评论输入栏高度，避免内容被遮挡 */
  padding-bottom: ${vw(50)};
`;

/** 记录卡片 */
export const RecordCard = styled.div`
  height: 100%;
  overflow: auto;
  padding: ${vw(14)};
  background: #fff;
  border: ${vw(1)} solid #ffe9ee;
  border-radius: ${vw(12)};
  box-shadow: 0 ${vw(4)} ${vw(16)} rgba(249, 126, 147, 0.1);
  &::-webkit-scrollbar {
    display: none;
  }
`;

/** 发布者信息 */
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(8)};
  margin-bottom: ${vw(12)};
  padding-bottom: ${vw(12)};
  border-bottom: ${vw(1)} solid #fff0f3;
`;

/** 发布者头像 */
export const Avatar = styled.img`
  width: ${vw(36)};
  height: ${vw(36)};
  border-radius: 50%;
  object-fit: cover;
  background: #f5f5f5;
`;

/** 发布者昵称 */
export const UserName = styled.span`
  font-size: ${vw(14)};
  color: #2d2d2d;
  font-weight: 500;
`;

/** 关系标签 */
export const RelationTag = styled.span<{ $variant?: string }>`
  font-size: ${vw(10)};
  color: ${({ $variant }) =>
    RELATION_COLORS[$variant ?? "other"]?.color ?? RELATION_COLORS.other.color};
  background: ${({ $variant }) =>
    RELATION_COLORS[$variant ?? "other"]?.bg ?? RELATION_COLORS.other.bg};
  padding: ${vw(1)} ${vw(10)};
  border-radius: ${vw(99)};
`;

/** 日期 + 月龄 */
export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(8)};
  margin-bottom: ${vw(10)};
`;

/** 记录日期 */
export const CardDate = styled.span`
  font-size: ${vw(14)};
  color: #000000e0;
  font-weight: 600;
`;

/** 大事记发生时的月龄 */
export const AgeTag = styled.span`
  margin-left: auto;
  font-size: ${vw(12)};
  color: #ff6b8a;
  background: #fff0f3;
  padding: ${vw(2)} ${vw(10)};
  border-radius: ${vw(99)};
`;

/** 记录内容 */
export const CardContent = styled.p`
  font-size: ${vw(14)};
  color: #2d2d2d;
  line-height: ${vw(22)};
  text-align: justify;
  margin: 0;
  word-break: break-word;
`;

/** 图片网格 */
export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${vw(6)};
  margin-top: ${vw(12)};
`;

/** 图片项 */
export const GridImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${vw(8)};
  overflow: hidden;
  background: #f5f5f5;
  position: relative;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* 文件类型角标 */
export const FileTypeBadge = styled.div`
  position: absolute;
  bottom: ${vw(4)};
  left: ${vw(4)};
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: ${vw(10)};
  padding: ${vw(2)} ${vw(6)};
  border-radius: ${vw(4)};
  display: flex;
  align-items: center;
  gap: ${vw(2)};
`;

/** 标签容器 */
export const TagWrap = styled.div`
  margin-top: ${vw(12)};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${vw(6)};
`;

/** 记录标签 */
export const RecordTag = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: ${vw(11)};
  color: #ff6b8a;
  background: #fff0f3;
  padding: ${vw(2)} ${vw(8)};
  border-radius: ${vw(10)};
`;

/** 评论区 */
export const CommentSection = styled.div`
  margin-top: ${vw(14)};
  padding-top: ${vw(12)};
  border-top: ${vw(1)} solid #fff0f3;
`;

/** 评论区标题 */
export const CommentTitle = styled.div`
  font-size: ${vw(13)};
  color: #999;
  font-weight: 500;
  margin-bottom: ${vw(10)};
`;

/** 单条评论 */
export const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${vw(8)};
  & + & {
    margin-top: ${vw(12)};
  }
`;

/** 评论者头像 */
export const CommentAvatar = styled.img`
  width: ${vw(28)};
  height: ${vw(28)};
  border-radius: 50%;
  object-fit: cover;
  background: #f5f5f5;
  flex-shrink: 0;
`;

/** 评论主体 */
export const CommentBody = styled.div`
  flex: 1;
  min-width: 0;
`;

/** 评论头部：昵称 + 关系 */
export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(6)};
`;

/** 评论者昵称 */
export const CommentName = styled.span`
  font-size: ${vw(12)};
  color: #999;
`;

/** 评论时间 */
export const CommentTime = styled.span`
  margin-left: auto;
  font-size: ${vw(10)};
  color: #ccc;
`;

/** 评论内容 */
export const CommentContent = styled.p`
  margin: ${vw(12)} 0 0;
  font-size: ${vw(13)};
  color: #2d2d2d;
  line-height: ${vw(20)};
  word-break: break-word;
`;

/** 操作栏 */
export const ActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${vw(16)};
  padding-top: ${vw(12)};
`;

/** 操作按钮 */
export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${vw(4)};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: ${vw(12)};
  color: #999;
`;

/** 评论输入区（固定底部） */
export const CommentInputWrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: ${vw(8)};
  padding: ${vw(12)} ${vw(12)};
  padding-bottom: calc(${vw(10)} + env(safe-area-inset-bottom));
  background: #fff;
  border-top: ${vw(1)} solid #fff0f3;
  z-index: 10;
`;

/** 评论输入框 */
export const CommentInput = styled.input`
  flex: 1;
  border: ${vw(1)} solid rgba(0, 0, 0, 0.1);
  border-radius: ${vw(16)};
  padding: ${vw(8)} ${vw(12)};
  font-size: ${vw(12)};
  outline: none;
  background: #fff;

  &::placeholder {
    color: #00000040;
  }

  &:focus {
    border-color: #ff6b8a;
  }
`;
