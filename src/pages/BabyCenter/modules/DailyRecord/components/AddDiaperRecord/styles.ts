import styled from "styled-components";
import { vw } from "@/utils";

/** 添加记录弹层容器 */
export const AddRecordPopup = styled.div`
  background: #f7f7f7;
  border-radius: ${vw(12)} ${vw(12)} 0 0;
`;

/** 顶部导航栏 */
export const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${vw(44)};
  padding: ${vw(8)} ${vw(16)};
  background: #fff;
  font-size: ${vw(14)};
  border-radius: ${vw(12)} ${vw(12)} 0 0;
`;

export const HeaderCancel = styled.span`
  color: #999;
  font-size: ${vw(14)};
  cursor: pointer;
`;

export const HeaderTitle = styled.span`
  color: #222;
  font-weight: 500;
  font-size: ${vw(16)};
`;

export const HeaderSave = styled.span`
  color: #ff6b8a;
  font-size: ${vw(14)};
  cursor: pointer;
`;

/** 表单项行 */
export const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${vw(52)};
  padding: 0 ${vw(16)};
  background: #fff;
  font-size: ${vw(14)};
`;

export const FormRowLabel = styled.span`
  color: #333;
  font-size: ${vw(16)};
`;

export const FormRowValue = styled.div`
  display: flex;
  align-items: center;
  color: #999;
  font-size: ${vw(14)};
  gap: ${vw(4)};
`;

/** 尿布状态选择区（臭臭/嘘嘘/臭臭+嘘嘘/干爽） */
export const StatusSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${vw(8)};
  padding: ${vw(20)} ${vw(12)};
  background: #fff;
  margin-top: ${vw(10)};
`;

export const StatusOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(8)};
  cursor: pointer;
`;

export const StatusIconWrap = styled.div<{ $active: boolean }>`
  position: relative;
  width: ${vw(56)};
  height: ${vw(56)};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;

  &::after {
    content: "";
    position: absolute;
    bottom: ${vw(-2)};
    left: 50%;
    transform: translateX(-50%);
    width: ${vw(44)};
    height: ${vw(10)};
    border-radius: 50%;
    background: ${(props) =>
      props.$active ? "rgba(255, 107, 138, 0.35)" : "transparent"};
    filter: blur(${vw(4)});
    transition: all 0.2s;
  }
`;

export const StatusImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 1;
`;

export const StatusCheckBadge = styled.div`
  position: absolute;
  right: ${vw(-2)};
  bottom: ${vw(-2)};
  width: ${vw(20)};
  height: ${vw(20)};
  border-radius: 50%;
  background: #ff6b8a;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  box-shadow: 0 ${vw(2)} ${vw(6)} rgba(255, 107, 138, 0.35);

  &::before {
    content: "";
    width: ${vw(10)};
    height: ${vw(5)};
    border-left: ${vw(2)} solid #fff;
    border-bottom: ${vw(2)} solid #fff;
    transform: rotate(-45deg) translate(${vw(1)}, ${vw(-1)});
  }
`;

export const StatusText = styled.span<{ $active: boolean; $color: string }>`
  font-size: ${vw(14)};
  color: ${(props) => (props.$active ? props.$color : "#999")};
  font-weight: ${(props) => (props.$active ? "500" : "400")};
  white-space: nowrap;
`;

/** 属性选择区（臭臭颜色/形状、尿量） */
export const OptionSection = styled.div`
  background: #fff;
  margin-top: ${vw(10)};
  padding: ${vw(16)};
`;

export const OptionLabel = styled.div`
  color: #333;
  font-size: ${vw(14)};
  margin-bottom: ${vw(12)};
`;

/** 尿量选择（图片卡片） */
export const PeeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${vw(12)};
`;

export const PeeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(6)};
  cursor: pointer;
  transition: all 0.2s;
`;

export const PeeLabel = styled.span<{ $active: boolean }>`
  font-size: ${vw(12)};
  color: ${(props) => (props.$active ? "#ff6b8a" : "#666")};
  text-align: center;
`;

/** 臭臭形状选择（图片卡片） */
export const ShapeGrid = styled.div`
  display: flex;
  gap: ${vw(24)};
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ShapeItem = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(6)};
  cursor: pointer;
  transition: all 0.2s;
`;

export const ShapeLabel = styled.span<{ $active: boolean }>`
  font-size: ${vw(12)};
  color: ${(props) => (props.$active ? "#ff6b8a" : "#666")};
  text-align: center;
`;

/** 臭臭颜色选择 */
export const ColorGrid = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: ${vw(24)};
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ColorItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(6)};
  cursor: pointer;
  min-width: ${vw(40)};
`;

export const ColorDot = styled.div<{ $color: string }>`
  position: relative;
  width: ${vw(34)};
  height: ${vw(34)};
  border-radius: 50%;
  background: ${(props) => props.$color};
`;

/** 颜色选中角标（小号，适配色点尺寸） */
export const ColorCheckBadge = styled(StatusCheckBadge)`
  width: ${vw(14)};
  height: ${vw(14)};
  right: ${vw(-2)};
  bottom: ${vw(-2)};

  &::before {
    width: ${vw(7)};
    height: ${vw(3.5)};
    border-left: ${vw(1.5)} solid #fff;
    border-bottom: ${vw(1.5)} solid #fff;
    transform: rotate(-45deg) translate(${vw(0.5)}, ${vw(-0.5)});
  }
`;

export const ColorLabel = styled.span<{ $active: boolean }>`
  font-size: ${vw(12)};
  color: ${(props) => (props.$active ? "#ff6b8a" : "#999")};
`;

/** 红屁股开关行 */
export const RashRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${vw(16)};
  background: #fff;
  margin-top: ${vw(12)};
`;

export const RashLabel = styled.span`
  color: #333;
  font-size: ${vw(14)};
`;

/** 备注区域 */
export const RemarkSection = styled.div`
  margin-top: ${vw(10)};
  background: #fff;
  padding: ${vw(16)};
`;

export const RemarkLabel = styled.div`
  color: #333;
  font-size: ${vw(15)};
  margin-bottom: ${vw(12)};
`;

export const RemarkTextarea = styled.textarea`
  width: 100%;
  min-height: ${vw(80)};
  padding: ${vw(12)};
  border: none;
  outline: none;
  background: #f7f7f7;
  border-radius: ${vw(8)};
  font-size: ${vw(14)};
  color: #333;
  resize: none;
  box-sizing: border-box;
  font-family: inherit;

  &::placeholder {
    color: #bbb;
  }
`;
