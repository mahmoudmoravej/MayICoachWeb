import React from "react";
import { User } from "~/models/user";

export const AuthenticationContext = React.createContext<{
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}>({
  user: undefined,
  setUser: () => {},
});

export function useAuthenticationContext() {
  return React.useContext(AuthenticationContext);
}
