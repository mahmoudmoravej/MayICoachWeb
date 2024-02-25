import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";

export const ApolloServerProvider = ({
  client,
  children,
}: {
  client: ApolloClient<NormalizedCacheObject>;
  children: React.ReactNode;
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
