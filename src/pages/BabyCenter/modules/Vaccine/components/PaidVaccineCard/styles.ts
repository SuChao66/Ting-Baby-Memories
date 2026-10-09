import styled from "styled-components";
import { vw } from "@/utils";

/** 自费疫苗卡片 */
export const PaidCardWrap = styled.div`
  background: #fff;
  border-radius: ${vw(14)};
  padding: ${vw(14)};
  box-shadow: 0 ${vw(2)} ${vw(10)} rgba(255, 143, 168, 0.1);
`;

/** 卡片头行：疫苗名 + 计划开关 */
export const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${vw(8)};
`;

/** 疫苗名称 */
export const VaccineName = styled.div`
  font-size: ${vw(15)};
  font-weight: 600;
  color: #2d2d2d;
`;

/** 计划开关区 */
export const SwitchWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(6)};
  color: #9c9c9c;
  font-size: ${vw(11)};
  flex-shrink: 0;
`;

/** 疾病说明 */
export const CardIntro = styled.div`
  margin-top: ${vw(6)};
  color: #646566;
  font-size: ${vw(12)};
`;

/** 补充说明 / 底部信息行 */
export const CardMeta = styled.div`
  margin-top: ${vw(6)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${vw(8)};
  color: #9c9c9c;
  font-size: ${vw(11)};
  line-height: 1.5;
`;

/** 剂次/月龄信息 */
export const MetaText = styled.div`
  flex: 1;
  min-width: 0;
`;

/** 已全部接种标记 */
export const DoneText = styled.div`
  flex-shrink: 0;
  color: #00b578;
  font-size: ${vw(12)};
  font-weight: 500;
`;

/** 登记按钮 */
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
