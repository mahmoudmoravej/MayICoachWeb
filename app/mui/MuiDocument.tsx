import { EmotionCache, withEmotionCache } from "@emotion/react";
import { unstable_useEnhancedEffect as useEnhancedEffect } from "@mui/material";
import { useContext } from "react";
import ClientStyleContext from "./ClientStyleContext";

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

//TODO: Do we really need this one???
export const MuiDocument = withEmotionCache(
  ({ children }: DocumentProps, emotionCache: EmotionCache) => {
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEnhancedEffect(() => {
      debugger;
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        // eslint-disable-next-line no-underscore-dangle
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData.reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return children;
  },
);
