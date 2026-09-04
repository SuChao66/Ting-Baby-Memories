import styled from "styled-components";
import { vw } from "@/utils";

/** 操作栏 */
export const ActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${vw(4)};
  padding-top: ${vw(6)};
`;

/** 大事记 */
export const MilestoneBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${vw(4)};
  border-radius: ${vw(32)};
  background: #f5f5f5;
  color: #00000073;
  font-size: ${vw(12)};
  font-weight: 400;
  padding: ${vw(1)} ${vw(6)};
`;

/** 操作按钮容器 */
export const ActionBtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(4)};
`;

/** 操作按钮 */
export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

/** 评论区 */
export const CommentSection = styled.div`
  margin-top: ${vw(6)};
  padding-top: ${vw(6)};
  border-top: 1px solid rgba(0, 0, 0, 0.06);
`;

/** 评论项 */
export const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${vw(8)};
  margin-bottom: ${vw(8)};

  &:last-child {
    margin-bottom: 0;
  }
`;

/** 评论头像 */
export const CommentAvatar = styled.img`
  width: ${vw(24)};
  height: ${vw(24)};
  border-radius: 50%;
  object-fit: cover;
`;

/** 评论内容区 */
export const CommentBody = styled.div`
  flex: 1;
  min-width: 0;
`;

/** 评论用户名 */
export const CommentUser = styled.span`
  font-size: ${vw(12)};
  color: #ff6b8a;
  font-weight: 500;
`;

/** 评论文字 */
export const CommentText = styled.p`
  font-size: ${vw(13)};
  color: #2d2d2d;
  line-height: ${vw(20)};
  margin: ${vw(2)} 0 0;
  word-break: break-word;
`;

/** 评论输入区 */
export const CommentInputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(8)};
  margin-top: ${vw(8)};
`;

/** 评论输入框 */
export const CommentInput = styled.input`
  flex: 1;
  border: 1px solid rgba(0, 0, 0, 0.1);
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
