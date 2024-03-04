import { useState } from "react";

import { SettingsContext } from "./settingsContext";

export const SettingsClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [graphqlUrl] = useState<string>(window.__GRAPHQLURL__);
  const [sideNavBarOpen, setSideNavBarOpen] = useState<boolean | null>(null);

  return (
    <SettingsContext.Provider
      value={{
        graphqlUrl,
        sideNavBarOpen,
        setSideNavBarOpen,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
