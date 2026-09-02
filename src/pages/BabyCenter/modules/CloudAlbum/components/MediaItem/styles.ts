import styled from "styled-components";
import { vw } from "@/utils";

export const MediaCard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${vw(12)};
  overflow: hidden;
  background: linear-gradient(135deg, #ffd3dd 0%, #ffe3ec 100%);
  cursor: pointer;

  &:active {
    opacity: 0.85;
  }

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
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
