import theme from "./theme";
import { MetaDescriptor } from "@remix-run/react";

export const getMuiMeta = (): MetaDescriptor[] => [
  { name: "theme-color", content: theme.palette.primary.main },
];
