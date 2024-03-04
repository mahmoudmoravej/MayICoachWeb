import React from "react";
import { Settings } from "~/models/settings";

export const SettingsContext = React.createContext<Settings>({
  graphqlUrl: "",
  navBarOpen: false,
  setNavBarOpen: () => false,
});

export function useSettingsContext() {
  return React.useContext(SettingsContext);
}
