import styled from "styled-components";
import { vw } from "@/utils";

/** 剂次卡片：白底圆角 + 柔和投影 */
export const DoseCardWrap = styled.div<{ $clickable: boolean }>`
  background: #fff;
  border-radius: ${vw(14)};
  padding: ${vw(12)} ${vw(14)};
  box-shadow: 0 ${vw(2)} ${vw(10)} rgba(255, 143, 168, 0.1);
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  transition: transform 0.2s;

  ${({ $clickable }) =>
    $clickable &&
    `
    &:active {
      transform: scale(0.98);
    }
  `}
`;

/** 卡片头行：疫苗名 + 剂次标记 + 状态徽标 */
export const CardHead = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(8)};
`;

/** 疫苗名称 */
export const DoseName = styled.div`
  font-size: ${vw(15)};
  font-weight: 600;
  color: #2d2d2d;
`;

/** 剂次序号标记 */
export const DoseTag = styled.div`
  flex-shrink: 0;
  padding: ${vw(1)} ${vw(6)};
  border-radius: ${vw(6)};
  background: #fff0f3;
  color: #ff6b8a;
  font-size: ${vw(10)};
`;

/** 状态徽标（右对齐） */
export const StatusBadge = styled.div<{ $color: string; $bg: string }>`
  margin-left: auto;
  flex-shrink: 0;
  padding: ${vw(2)} ${vw(8)};
  border-radius: ${vw(10)};
  color: ${({ $color }) => $color};
  background: ${({ $bg }) => $bg};
  font-size: ${vw(11)};
  font-weight: 500;
`;

/** 副行：预防疾病 + 推荐月龄 */
export const CardSub = styled.div`
  margin-top: ${vw(6)};
  color: #9c9c9c;
  font-size: ${vw(11)};
`;

/** 底部操作行 */
export const CardFoot = styled.div`
  margin-top: ${vw(10)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${vw(8)};
`;

/** 已接种记录信息 */
export const RecordInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(8)};
  color: #646566;
  font-size: ${vw(12)};
`;

/** 接种日期 */
export const RecordDate = styled.span`
  color: #00b578;
  font-weight: 500;
`;

/** 接种单位 */
export const RecordPlace = styled.span`
  color: #9c9c9c;
  font-size: ${vw(11)};
`;

/** 待接种提示文案 */
export const FootTip = styled.div`
  flex: 1;
  min-width: 0;
  color: #9c9c9c;
  font-size: ${vw(11)};
`;

/** 登记接种按钮 */
export const RegisterBtn = styled.button`
  flex-shrink: 0;
  padding: ${vw(5)} ${vw(14)};
  border: none;
  border-radius: ${vw(14)};
  background: linear-gradient(135deg, #ff8fa8 0%, #ff6b8a 100%);
  color: #fff;
  font-size: ${vw(12)};
  font-weight: 500;
  cursor: pointer;

  &:active {
    opacity: 0.85;
  }
`;
