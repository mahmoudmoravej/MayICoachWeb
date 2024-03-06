import React from "react";
import { User } from "~/models/user";

type AuthenticationContextProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isAuthenticated: boolean;
};

export const AuthenticationContext =
  React.createContext<AuthenticationContextProps>({
    user: null,
    setUser: () => {},
    isAuthenticated: false,
  });

export function useAuthenticationContext() {
  return React.useContext(AuthenticationContext);
}

export function useUser() {
  const { user } = useAuthenticationContext();
  if (user == null)
    throw new Error(
      "User is not authenticated. If you are ok with that, get the user from the useAuthenticationContext",
    );
  return user;
}
