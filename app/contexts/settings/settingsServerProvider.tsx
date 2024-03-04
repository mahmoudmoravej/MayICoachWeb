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
        navBarOpen: false,
        setNavBarOpen: () => {},
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
