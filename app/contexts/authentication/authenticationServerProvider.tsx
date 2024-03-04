import { User } from "~/models/user";
import { AuthenticationContext } from "./authenticationContext";

export const AuthenticationServerProvider = ({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) => {
  return (
    <AuthenticationContext.Provider
      value={{
        user: user,
        setUser: () => {},
        isAuthenticated: user != null,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
