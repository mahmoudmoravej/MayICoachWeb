/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "@material-tailwind/react";

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

const process = {
  env: {
    GRAPHQL_SCHEMA_URL: "http://localhost:3000/graphql",
  },
};

function getToken() {
  //Note: we use this function as this file is loaded only once.

  const token = sessionStorage.getItem("token");
  if (token == null) {
    // throw new Error("Not Authorized!"); we should manage it. Throughing an error affects the whole page rendering process.
  }
  return token;
}

startTransition(() => {
  const client = new ApolloClient({
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
    uri: process.env.GRAPHQL_SCHEMA_URL || "GRAPHQL_SCHEMA_URL IS NOT SET", // the same uri in our entry.server file
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    defaultOptions: {
      query: {
        fetchPolicy: "network-only",
      },
    },
    ssrForceFetchDelay: 1000, // we need this to help ssr with network-only works as expected. so we don;'t see extra queries on the client side.
  });

  hydrateRoot(
    document,
    <StrictMode>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <RemixBrowser />
        </ThemeProvider>
      </ApolloProvider>
    </StrictMode>,
  );
});
