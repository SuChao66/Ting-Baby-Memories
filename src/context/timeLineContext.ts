import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export interface ITimeLineContext {
  refreshKey: number;
  setRefreshKey: Dispatch<SetStateAction<number>>;
}

export const TimeLineContext = createContext<ITimeLineContext | null>(null);
