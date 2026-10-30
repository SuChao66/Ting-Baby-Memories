import { uuid } from "@/utils";
import type { sessionItem } from "@/types";

export class SessionManager {
  static createSession(sessionCode: string): sessionItem {
    return {
      sessionCode,
      reqId: uuid(),
      question: "",
      answer: "",
    };
  }
}
