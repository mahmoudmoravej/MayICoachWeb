import { useState } from "react";

import { User } from "~/models/user";
import { AuthenticationContext } from "./authenticationContext";

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | undefined>();

  return (
    <AuthenticationContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
