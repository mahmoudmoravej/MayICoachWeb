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

startTransition(() => {
  const token =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1ZjRiZjQ2ZTUyYjMxZDliNjI0OWY3MzA5YWQwMzM4NDAwNjgwY2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDU3NjQyODgyNDkxLTk5ZjdzYXFxdmhuNTZzZ3I2NGtqaWVpa2FkcWFqOGU1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA1NzY0Mjg4MjQ5MS05OWY3c2FxcXZobjU2c2dyNjRramllaWthZHFhajhlNS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMjUyODE0NDM5OTU0Njg1MDQ2MCIsImVtYWlsIjoibW9yYXZlakBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImZpWjN1bm5XN1g3RjNVQlZsMy1tNlEiLCJuYW1lIjoiTWFobW91ZCBNb3JhdmVqIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pLYjlLMjFnWlBGSVVCTXlYSkFSVVA1ckV2TFRQcnNsb0hGQVAzb3FkQj1zOTYtYyIsImdpdmVuX25hbWUiOiJNYWhtb3VkIiwiZmFtaWx5X25hbWUiOiJNb3JhdmVqIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2OTg5NTk5MDEsImV4cCI6MTY5ODk2MzUwMX0.FINpUhQJqKdcwNTAX6y6zvaLwYvYmd8iHxmwpkbD9MSKAKlKsvesmN77ZlLYaoMMx8MfiwMrJpKe1pEjW08U21ZmOAUvicZHXTNd8PqpkkFBq10hDw0892SXyiB4Y6AmJc0DubPQqgbL4m6asniqS6Uxz9VHM-BqygEaeLdvup5SqsGZOhGp8XsfvPvlrKWymLkQOZNmrtvN6RA6AW7wCf_WLPEgVMFxT2jdc9pbOoT1osS5pCOcGMBvdcTSMoMDgRq6xO17AXB9Qbc91L-5dB0ly9jx6_AnxksMDboJ3lLZCIj-cEQQCAWPi-xDLVmWqnqxeqQZB_PIs3gU2hettQ";

  const client = new ApolloClient({
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
    uri: process.env.GRAPHQL_SCHEMA_URL || "GRAPHQL_SCHEMA_URL IS NOT SET", // the same uri in our entry.server file
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
