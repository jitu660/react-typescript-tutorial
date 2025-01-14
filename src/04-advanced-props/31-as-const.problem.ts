import { Equal, Expect } from "../helpers/type-utils";

const BACKEND_TO_FRONTEND_STATUS_MAP = {
  0: "pending",
  1: "success",
  2: "error",
} as const;

type statusType = typeof BACKEND_TO_FRONTEND_STATUS_MAP;

type BackendStatus = keyof statusType;
type FrontendStatus = statusType[keyof statusType];

type test = [Expect<Equal<BackendStatus, 0 | 1 | 2>>, Expect<Equal<FrontendStatus, "pending" | "success" | "error">>];
