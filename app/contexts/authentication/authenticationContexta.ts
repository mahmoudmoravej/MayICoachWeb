import React from "react";
import { User } from "~/models/user";

export const AuthenticationContext = React.createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isAuthenticated: boolean;
}>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
});

export function useAuthenticationContext() {
  return React.useContext(AuthenticationContext);
}
