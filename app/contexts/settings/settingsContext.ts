import React from "react";
import { Settings } from "~/models/settings";

export const SettingsContext = React.createContext<Settings>({
  graphqlUrl: "",
  sideNavBarOpen: null,
  setSideNavBarOpen: () => false,
});

export function useSettingsContext() {
  return React.useContext(SettingsContext);
}
