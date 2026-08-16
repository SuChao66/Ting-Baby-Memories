import styled from "styled-components";
import { vw } from "@/utils";

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: ${vw(16)};
  color: #000000e0;
`;
