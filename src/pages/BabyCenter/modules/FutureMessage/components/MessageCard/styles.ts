import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 未来寄语卡片 */
export const MessageCardContainer = styled.div`
  padding: ${vw(14)};
  margin-bottom: ${vw(12)};
  background: #fff;
  border: ${vw(1)} solid #ffe9ee;
  border-radius: ${vw(8)};
  box-shadow: 0 ${vw(4)} ${vw(16)} rgba(249, 126, 147, 0.1);
`;

/** 卡片头部：解锁日期 + 可见范围 */
export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${vw(12)};
`;

/** 解锁日期 */
export const CardDate = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${vw(4)};
  font-size: ${vw(14)};
`;

/** 可见范围标签 */
export const VisibilityTag = styled.span`
  margin-left: auto;
  font-size: ${vw(12)};
  color: #ff6b8a;
  background: #fff0f3;
  padding: ${vw(2)} ${vw(10)};
  border-radius: ${vw(99)};
`;

/** 解锁那天宝宝的年龄 */
export const AgeHint = styled.div`
  font-size: ${vw(12)};
  color: #ff6b8a;
  margin-bottom: ${vw(12)};
`;

/** 寄语内容 */
export const CardContent = styled.p`
  font-size: ${vw(14)};
  color: #2d2d2d;
  line-height: ${vw(22)};
  text-align: justify;
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

/** 文件类型角标 */
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

/** 音频附件行 */
export const AudioItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(8)};
  min-height: ${vw(44)};
  margin-top: ${vw(8)};
  padding: 0 ${vw(10)};
  background: #fff0f3;
  border-radius: ${vw(20)};
`;

/** 音频播放/暂停按钮 */
export const AudioPlay = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

/** 音频名称 */
export const AudioName = styled.span`
  flex: 1;
  font-size: ${vw(12)};
  color: #2d2d2d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/** 卡片底部：创建人 + 写下时间 */
export const CardFooter = styled.div`
  margin: ${vw(10)} 0 0;
  font-size: ${vw(12)};
  color: #9c9c9c;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/** 创建人信息：头像 + 昵称 + 关系 */
export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(6)};
  min-width: 0;
`;

/** 关系标签 */
export const RelationTag = styled.span`
  flex-shrink: 0;
  font-size: ${vw(12)};
  color: #ff6b8a;
  background: #fff0f3;
  padding: ${vw(2)} ${vw(10)};
  border-radius: ${vw(99)};
`;

/** 创建人头像 */
export const CardImg = styled.div`
  flex-shrink: 0;
  width: ${vw(24)};
  height: ${vw(24)};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

/* ========== 信件展开态 ========== */

/** 信件内容容器（展开/收起动画，收起时倒放降回） */
export const LetterContent = styled.div<{ $closing?: boolean }>`
  animation: ${(props) =>
    props.$closing ? "letterOut 0.3s ease forwards" : "letterIn 0.3s ease"};

  @keyframes letterIn {
    from {
      opacity: 0;
      transform: translateY(${vw(10)});
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 收起：信纸降回信封并消失（forwards 保持收起后的状态） */
  @keyframes letterOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(${vw(10)});
    }
  }
`;

/** 卡片操作按钮组（收起/编辑/删除，收起动画进行中随之淡出） */
export const CardActions = styled.div<{ $closing?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${vw(24)};
  margin-top: ${vw(10)};
  opacity: ${(props) => (props.$closing ? 0 : 1)};
  transition: opacity 0.3s ease;
`;

/** 操作按钮（$danger 时为删除按钮红色调） */
export const ActionButton = styled.div<{ $danger?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${vw(3)};
  font-size: ${vw(12)};
  color: ${(props) => (props.$danger ? "#ff4d4f" : "#ff6b8a")};
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
`;
