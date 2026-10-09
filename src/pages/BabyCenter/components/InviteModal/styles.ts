// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 弹层头部 */
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${vw(20)} ${vw(20)} ${vw(12)};
`;

/** 弹层标题 */
export const ModalTitle = styled.div`
  font-size: ${vw(18)};
  font-weight: 600;
  color: #2d2d2d;
`;

/** 关闭按钮 */
export const CloseBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${vw(28)};
  height: ${vw(28)};
  border-radius: 50%;
  background: #f5f5f5;
  cursor: pointer;
`;

/** 弹层内容区 */
export const ModalBody = styled.div`
  padding: 0 ${vw(20)} ${vw(24)};
  max-height: 70vh;
  overflow-y: auto;
`;

/** 区块标签 */
export const SectionLabel = styled.p`
  font-size: ${vw(14)};
  font-weight: 500;
  color: #2d2d2d;
  margin-bottom: ${vw(10)};
`;

/** 关系选择网格 */
export const RelationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${vw(10)};
  margin-bottom: ${vw(20)};
`;

/** 关系选项 */
export const RelationOption = styled.div`
  height: ${vw(40)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${vw(14)};
  color: #000000e0;
  background: #fafafa;
  border: ${vw(1)} solid #ffffff;
  border-radius: ${vw(24)};
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s,
    color 0.2s;

  &.active {
    color: #ff6b8a;
    font-weight: 500;
    background: #fff0f3;
    border-color: #ff6b8a;
  }
`;

/** 有效期选择行 */
export const ExpireRow = styled.div`
  display: flex;
  gap: ${vw(10)};
  margin-bottom: ${vw(20)};
`;

/** 有效期选项 */
export const ExpireOption = styled.div`
  flex: 1;
  height: ${vw(40)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${vw(14)};
  color: #000000e0;
  background: #fafafa;
  border: ${vw(1)} solid #ffffff;
  border-radius: ${vw(24)};
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s,
    color 0.2s;

  &.active {
    color: #ff6b8a;
    font-weight: 500;
    background: #fff0f3;
    border-color: #ff6b8a;
  }
`;

/** 链接展示框 */
export const LinkBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(10)};
  border: ${vw(1)} dashed #ff9eb5;
  background: #fff0f3;
  border-radius: ${vw(10)};
  padding: ${vw(10)} ${vw(12)};
  margin-bottom: ${vw(12)};
`;

/** 链接文本 */
export const LinkText = styled.span`
  flex: 1;
  font-size: ${vw(12)};
  color: #666;
  word-break: break-all;
  line-height: ${vw(20)};
  text-align: center;
`;

/** 复制按钮 */
export const CopyBtn = styled.span`
  flex-shrink: 0;
  font-size: ${vw(14)};
  font-weight: 500;
  color: #ffffff;
  background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
  border-radius: ${vw(8)};
  padding: ${vw(6)} ${vw(12)};
  cursor: pointer;
`;

/** 底部说明 */
export const ModalTip = styled.p`
  font-size: ${vw(12)};
  color: #bbb;
  line-height: ${vw(20)};
  margin-bottom: ${vw(16)};
`;

/** 生成按钮容器 */
export const GenerateButtonWrapper = styled.div`
  .invite-generate-btn {
    background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
    padding: ${vw(18)};
    border-radius: ${vw(99)};
    border: none;
  }
`;
