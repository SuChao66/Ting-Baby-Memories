// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 表单容器 */
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(16)};
  margin-top: ${vw(20)};
`;

/** 表单项 */
export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(8)};
`;

/** 表单标签 */
export const FormLabel = styled.span`
  font-size: ${vw(14)};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** 日期输入框 */
export const DateInput = styled.input`
  width: 100%;
  height: ${vw(36)};
  padding: 0 ${vw(12)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${vw(4)};
  font-size: ${vw(14)};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primaryColorLight};
  }
`;
