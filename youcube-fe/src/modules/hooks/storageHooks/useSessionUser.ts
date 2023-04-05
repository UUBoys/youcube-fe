/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { useState } from "react";

import { useCookie } from "../useLocalStorage";

import { IUserSession } from "@/modules/utils/schemas/user";

export function useSessionUser() {
  const defaultUserSession: IUserSession = {};
  const [fallbackValue] = useState(defaultUserSession);
  return useCookie<IUserSession>("sessionUser", fallbackValue);
}
