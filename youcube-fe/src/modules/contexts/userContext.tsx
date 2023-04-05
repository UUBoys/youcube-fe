import { Dispatch, SetStateAction, createContext, useContext } from "react";

import { useSessionUser } from "../hooks/storageHooks/useSessionUser";
import { IUserSession } from "../utils/schemas/user";

const UserSessionContext = createContext<IUserSession>({});
const SetUserSessionContext = createContext<
  Dispatch<SetStateAction<IUserSession>>
>((value) => {
  console.log("Default function:", value);
});

export function useUserSessionContext() {
  return useContext(UserSessionContext);
}

export function useSetUserSessionContext() {
  return useContext(SetUserSessionContext);
}

export const UserSessionContextProvider = ({ children }: any) => {
  const [sessionUser, setSessionUser] = useSessionUser();
  return (
    <UserSessionContext.Provider value={sessionUser}>
      <SetUserSessionContext.Provider value={setSessionUser}>
        {children}
      </SetUserSessionContext.Provider>
    </UserSessionContext.Provider>
  );
};
