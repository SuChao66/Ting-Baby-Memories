import styled from "styled-components";
import { vw } from "@/utils";

/** 记录列表容器 */
export const RecordListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(12)};
  margin: ${vw(12)} 0;
`;

/** 单条记录卡片 */
export const RecordItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(12)};
  padding: ${vw(14)};
  background: #fff;
  border-radius: ${vw(12)};
  box-shadow: 0 ${vw(2)} ${vw(12)} rgba(255, 107, 138, 0.08);

  &:active {
    opacity: 0.7;
  }
`;

/** 记录类型图标 */
export const RecordIconWrap = styled.div<{ $gradient?: string }>`
  flex-shrink: 0;
  width: ${vw(40)};
  height: ${vw(40)};
  border-radius: 50%;
  background: ${(props) => props.$gradient || "#f5f5f5"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

/** 记录内容区 */
export const RecordContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${vw(4)};
`;

/** 记录类型名称 */
export const RecordTitle = styled.span`
  font-size: ${vw(14)};
  color: #2d2d2d;
  font-weight: 500;
`;

/** 记录摘要 */
export const RecordSummary = styled.span`
  font-size: ${vw(12)};
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/** 备注标签 */
export const RecordRemark = styled.span`
  align-self: flex-start;
  font-size: ${vw(10)};
  color: #ff6b8a;
  background: #fff0f3;
  padding: ${vw(2)} ${vw(8)};
  border-radius: ${vw(10)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/** 记录时间 */
export const RecordTime = styled.span`
  flex-shrink: 0;
  font-size: ${vw(12)};
  color: #00000073;
`;