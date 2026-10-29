import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export interface IInputValueContext {
  question: string;
  setQuestion: Dispatch<SetStateAction<string>>;
}

export const InputValueContext = createContext<IInputValueContext | null>({
  question: null,
  setQuestion: () => {},
});
