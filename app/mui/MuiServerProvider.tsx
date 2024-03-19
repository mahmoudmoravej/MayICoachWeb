import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import createEmotionCache from "./createEmotionCache";

import theme from "./theme";

export function MuiServerProvider({ children }: { children: React.ReactNode }) {
  const cache = createEmotionCache();

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
