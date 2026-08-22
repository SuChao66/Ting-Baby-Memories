// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 标签管理页面容器 */
export const TagManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${vw(16)};
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/* ========== 保存按钮 ========== */
export const SaveBtn = styled.div`
  padding: ${vw(4)} ${vw(16)};
  border-radius: ${vw(12)};
  background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
  font-size: ${vw(12)};
  font-weight: 600;
  color: #fff;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;

/* ========== 标签输入卡片 ========== */
export const TagInputCard = styled.div`
  background: #fff;
  border-radius: ${vw(12)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
  padding: ${vw(16)} ${vw(20)};
`;

export const SelectedTagsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${vw(8)};
  margin-bottom: ${vw(12)};
`;

export const TagInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: ${vw(15)};
  color: #2d2d2d;
  background: transparent;
  font-family: inherit;

  &::placeholder {
    color: #ccc;
  }
`;

/* ========== 标签项 ========== */
export const TagPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: ${vw(4)};
  font-size: ${vw(12)};
  color: #ff6b8a;
  background: #fff0f3;
  padding: ${vw(6)} ${vw(12)};
  border-radius: ${vw(16)};
`;

/* ========== 我的标签卡片 ========== */
export const MyTagsCard = styled.div`
  background: #fff;
  border-radius: ${vw(12)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
  padding: ${vw(16)} ${vw(20)};
`;

export const MyTagsTitle = styled.div`
  font-size: ${vw(14)};
  font-weight: 600;
  color: #2d2d2d;
  margin-bottom: ${vw(12)};
`;

export const MyTagsList = styled.div`
  display: flex;
  gap: ${vw(8)};
`;

/* ========== 标签删除按钮 ========== */
export const TagDelete = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
