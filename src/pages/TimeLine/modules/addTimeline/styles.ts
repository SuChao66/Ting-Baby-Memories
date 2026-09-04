// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 发布记录页面容器 */
export const AddTimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${vw(16)};
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/* ========== 内容输入卡片 ========== */
export const ContentCard = styled.div`
  background: #fff;
  border-radius: ${vw(20)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
  padding: ${vw(16)} ${vw(20)};
`;

export const ContentTextarea = styled.textarea`
  width: 100%;
  min-height: ${vw(120)};
  border: none;
  outline: none;
  resize: none;
  font-size: ${vw(15)};
  color: #2d2d2d;
  background: transparent;
  font-family: inherit;
  line-height: ${vw(24)};

  &::placeholder {
    color: #ccc;
  }
`;

/* ========== 图片上传区域 ========== */
export const ImageSection = styled.div`
  padding: 0;
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${vw(8)};
`;

export const ImageItem = styled.div`
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

export const ImageDelete = styled.div`
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

export const ImageAddBtn = styled.div`
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
    opacity: 0.7;
  }
`;

export const ImageAddText = styled.span`
  font-size: ${vw(11)};
  color: #ff9eb5;
`;

/* ========== 标签区域 ========== */
export const TagSection = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${vw(8)};
  margin-top: ${vw(12)};
`;

export const TagHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: ${vw(40)};
  padding: ${vw(3)} ${vw(6)};
`;

export const TagTitle = styled.span`
  font-size: ${vw(14)};
  font-weight: 400;
  color: #00000073;
`;

export const TagItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${vw(4)};
  font-size: ${vw(13)};
  color: #ff6b8a;
  background: #fff0f3;
  padding: ${vw(6)} ${vw(12)};
  border-radius: ${vw(16)};
`;

export const TagClose = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

/* ========== 日期时间选择行 ========== */
export const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(12)};
  height: ${vw(52)};
  padding: 0 ${vw(20)};
  background: #fff;
  border-radius: ${vw(20)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
  cursor: pointer;

  &:active {
    background: #fafafa;
  }
`;

export const TimeLabel = styled.span`
  font-size: ${vw(15)};
  color: #2d2d2d;
`;

export const TimeValue = styled.span`
  flex: 1;
  text-align: right;
  font-size: ${vw(14)};
  color: #999;
`;

/* ========== 选项行（大事件 / 谁可以看） ========== */
export const OptionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${vw(52)};
  padding: 0 ${vw(20)};
  background: #fff;
  border-radius: ${vw(20)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
`;

export const OptionLabel = styled.span`
  font-size: ${vw(15)};
  color: #2d2d2d;
`;

export const OptionRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(4)};
`;

export const OptionValue = styled.span<{ $active?: boolean }>`
  font-size: ${vw(14)};
  color: ${(p) => (p.$active ? "#ff6b8a" : "#999")};
`;

/* ========== 发布按钮 ========== */
export const PublishButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${vw(48)};
  border-radius: ${vw(24)};
  background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.3);
  font-size: ${vw(16)};
  font-weight: 600;
  color: #fff;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;
