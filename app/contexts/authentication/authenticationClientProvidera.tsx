import { useState } from "react";

import { User } from "~/models/user";
import { AuthenticationContext } from "./authenticationContexta";

export const AuthenticationClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User>(window.__USER_STATE__);

  return (
    <AuthenticationContext.Provider
      value={{
        user: user,
        setUser: setUser,
        isAuthenticated: user != null,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
