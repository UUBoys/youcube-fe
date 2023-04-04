/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { useLocalStorage } from "../useLocalStorage";

import { IUserSession } from "@/modules/utils/schemas/user";

export function useSessionUser() {
  return useLocalStorage<IUserSession>("sessionUser", {});
}
