import { useState } from "react";

import { SettingsContext } from "./settingsContext";

export const SettingsClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [graphqlUrl] = useState<string>(window.__GRAPHQLURL__);
  const [navBarOpen, setNavBarOpen] = useState<boolean>(true);

  return (
    <SettingsContext.Provider
      value={{
        graphqlUrl,
        navBarOpen,
        setNavBarOpen,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
