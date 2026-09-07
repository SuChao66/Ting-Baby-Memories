import styled from "styled-components";
import { vw } from "@/utils";

/** 新增寄语页面容器 */
export const AddFutureMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding-bottom: ${vw(20)};

  &::-webkit-scrollbar {
    display: none;
  }
`;

/** 表单卡片 */
export const FormCard = styled.div`
  background: #fff;
  border-radius: ${vw(12)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
  padding: ${vw(12)} ${vw(12)};
`;

/** 表单行（解锁日期 / 谁可以看） */
export const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(12)};
  min-height: ${vw(52)};
  cursor: pointer;

  &:active {
    opacity: 0.75;
  }
`;

/** 行标题 */
export const RowLabel = styled.span`
  flex-shrink: 0;
  font-size: ${vw(14)};
  color: #2d2d2d;
`;

/** 行右侧内容 */
export const RowValue = styled.span<{ $active?: boolean }>`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${vw(4)};
  font-size: ${vw(14)};
  color: ${(props) => (props.$active ? "#ff6b8a" : "#999")};
`;

/** 所选日期对应宝宝年龄提示 */
export const AgeHint = styled.div`
  font-size: ${vw(12)};
  color: #ff6b8a;
  padding-bottom: ${vw(10)};
`;

/** 寄语内容输入区 */
export const MessageTextarea = styled.textarea`
  width: 100%;
  min-height: ${vw(180)};
  border: none;
  outline: none;
  resize: none;
  border-top: 1px solid #f5f5f5;
  padding: ${vw(12)} 0;
  box-sizing: border-box;
  font-size: ${vw(14)};
  color: #2d2d2d;
  background: transparent;
  font-family: inherit;
  line-height: ${vw(24)};

  &::placeholder {
    color: #ccc;
  }
`;

/** 附件区域（图片/视频/音频） */
export const MediaSection = styled.div`
  padding: ${vw(4)} 0 ${vw(12)};
`;

/** 附件九宫格 */
export const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${vw(8)};
`;

/** 附件格子（图片/视频） */
export const MediaItem = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${vw(8)};
  overflow: hidden;
  background: #f5f5f5;
  cursor: pointer;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/** 附件类型角标 */
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

/** 附件删除按钮 */
export const MediaDelete = styled.div`
  position: absolute;
  top: ${vw(4)};
  right: ${vw(4)};
  width: ${vw(18)};
  height: ${vw(18)};
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

/** 添加附件按钮 */
export const MediaAddBtn = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${vw(8)};
  background: #fff0f3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${vw(4)};
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;

/** 添加按钮文案 */
export const MediaAddText = styled.span`
  font-size: ${vw(11)};
  color: #ff9eb5;
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

/** 音频删除按钮 */
export const AudioDelete = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

/** 底部保存按钮 */
export const SaveButton = styled.div`
  height: ${vw(44)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${vw(22)};
  background: #ff6b8a;
  color: #fff;
  font-size: ${vw(15)};
  cursor: pointer;

  &:active {
    opacity: 0.85;
  }
`;
