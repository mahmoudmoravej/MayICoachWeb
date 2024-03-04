import { SettingsContext } from "./settingsContext";

export const SettingsServerProvider = ({
  graphqlUrl,
  children,
}: {
  graphqlUrl: string;
  children: React.ReactNode;
}) => {
  return (
    <SettingsContext.Provider
      value={{
        graphqlUrl,
        sideNavBarOpen: null,
        setSideNavBarOpen: () => {},
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
