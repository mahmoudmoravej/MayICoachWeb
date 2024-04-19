import type {
  ApolloClient,
  NormalizedCacheObject,
} from "@apollo/client/index.js";

import { default as apollo } from "@apollo/client";

const { ApolloProvider } = apollo;

export const ApolloServerProvider = ({
  client,
  children,
}: {
  client: ApolloClient<NormalizedCacheObject>;
  children: React.ReactNode;
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
