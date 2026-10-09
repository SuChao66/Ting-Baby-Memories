// 导入 styled-components
import styled from "styled-components";
// 导入 vw 工具函数
import { vw } from "@/utils";

/** 宝宝档案页面容器 */
export const BabyFileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${vw(16)};
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/** 宝宝信息横幅 */
export const ProfileBanner = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(16)};
  padding: ${vw(28)} ${vw(20)};
  border-radius: ${vw(20)};
  background: linear-gradient(135deg, #ff6b8a 0%, #ff9eb5 100%);
  box-shadow: 0 ${vw(4)} ${vw(24)} rgba(255, 107, 138, 0.3);
`;

/** 横幅头像 */
export const BannerAvatar = styled.div`
  width: ${vw(64)};
  height: ${vw(64)};
  border-radius: 50%;
  background: #fff;
  border: ${vw(2)} solid rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/** 横幅文本区域 */
export const BannerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(6)};
  /* 允许子元素省略号截断生效 */
  min-width: 0;
`;

/** 横幅昵称行 */
export const BannerNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(6)};
`;

/** 横幅昵称 */
export const BannerName = styled.span`
  font-size: ${vw(20)};
  font-weight: 700;
  color: #fff;
`;

/** 横幅生日 */
export const BannerBirthday = styled.span`
  font-size: ${vw(12)};
  color: rgba(255, 255, 255, 0.85);
`;

/** 横幅宝宝号行（过长省略，复制图标不换行） */
export const BannerBabyNo = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(4)};
  font-size: ${vw(12)};
  color: rgba(255, 255, 255, 0.85);
  min-width: 0;

  .no {
    /* 宝宝号过长时省略显示 */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .copy-icon {
    flex-shrink: 0;
    cursor: pointer;
  }
`;

/** 卡片标题 */
export const CardTitle = styled.div`
  font-size: ${vw(16)};
  font-weight: 600;
  color: #00000073;
`;

/** 备注内容 */
export const RemarkContent = styled.div`
  padding: ${vw(12)} ${vw(12)};
`;

/** 备注文本 */
export const RemarkText = styled.div`
  font-size: ${vw(14)};
  color: #646566;
  line-height: ${vw(22)};
`;

/** 输入框样式 */
export const FormInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  text-align: right;
  font-size: ${vw(14)};
  color: #2d2d2d;
  background: transparent;

  &::placeholder {
    color: #ccc;
  }
`;

/** 多行文本框 */
export const FormTextarea = styled.textarea`
  width: 100%;
  min-height: ${vw(80)};
  border: none;
  outline: none;
  resize: none;
  font-size: ${vw(14)};
  color: #2d2d2d;
  background: transparent;
  font-family: inherit;

  &::placeholder {
    color: #ccc;
  }
`;

/** 保存按钮 */
export const SaveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${vw(12)} ${vw(0)};
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
