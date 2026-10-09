// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 邀请页容器 */
export const InviteContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${vw(24)};
  background: linear-gradient(180deg, #ffe3ec 0%, #fff0f3 40%, #fff 100%);
  padding: ${vw(24)} ${vw(24)};
  box-sizing: border-box;
  &:--webkit-scrollbar {
    display: none;
  }
`;

/** 顶部邀请信息区域 */
export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/** 邀请人头像 */
export const InviterAvatar = styled.div`
  width: ${vw(64)};
  height: ${vw(64)};
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 ${vw(6)} ${vw(16)} rgba(255, 107, 138, 0.3);
`;

/** 邀请人头像图片 */
export const InviterAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

/** 邀请标题 */
export const InviteTitle = styled.h2`
  font-size: ${vw(20)};
  font-weight: 600;
  color: #2d2d2d;
  margin-top: ${vw(12)};
`;

/** 邀请副标题 */
export const InviteSubtitle = styled.p`
  font-size: ${vw(14)};
  color: #999;
  margin-top: ${vw(4)};
`;

/** 信息填写卡片 */
export const FormCard = styled.div`
  width: 100%;
  background: #fff;
  border-radius: ${vw(12)};
  padding: ${vw(24)};
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.1);
`;

/** 表单标签 */
export const FormLabel = styled.p`
  font-size: ${vw(14)};
  font-weight: 500;
  color: #2d2d2d;
  margin-bottom: ${vw(10)};
`;

/** 昵称输入框容器 */
export const NicknameInputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${vw(42)};
  border: ${vw(1)} solid #f0f0f0;
  border-radius: ${vw(12)};
  padding: 0 ${vw(14)};
  background: #fafafa;
  transition:
    border-color 0.2s,
    background 0.2s;
  margin-bottom: ${vw(20)};

  &:focus-within {
    border-color: #ff6b8a;
    background: #fff;
  }

  /* 覆盖 NutUI Input 样式 */
  .nut-input {
    flex: 1;
    padding: 0;
    background: transparent;
    border: none;
    font-size: ${vw(15)};
  }
`;

/** 关系选择网格 */
export const RelationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${vw(12)};
`;

/** 关系选项 */
export const RelationOption = styled.div`
  height: ${vw(36)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${vw(14)};
  color: #666;
  background: #fafafa;
  border: ${vw(1)} solid #f0f0f0;
  border-radius: ${vw(12)};
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

/** 接受邀请按钮容器 */
export const AcceptButtonWrapper = styled.div`
  width: 100%;

  .accept-button {
    background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
    border: none;
    border-radius: ${vw(99)};
    padding: ${vw(24)} 0;
  }
`;

/** 底部提示 */
export const FooterTip = styled.p`
  font-size: ${vw(12)};
  color: #bbb;
  padding: 0;
`;

/** 加载中容器 */
export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
