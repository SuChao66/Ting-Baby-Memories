import styled from "styled-components";
import { vw } from "@/utils";

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${vw(12)};
  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
