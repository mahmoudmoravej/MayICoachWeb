import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
} from "@apollo/client/index.js";

export const ApolloServerProvider = ({
  client,
  children,
}: {
  client: ApolloClient<NormalizedCacheObject>;
  children: React.ReactNode;
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
