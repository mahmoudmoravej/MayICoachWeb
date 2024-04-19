import { getApolloClient } from "~/utils";
import { ApolloProvider } from "@apollo/client/index.js"; //because of https://github.com/apollographql/apollo-client/issues/9976
import { useAuthenticationContext } from "../authentication/authenticationContext";
import { useMemo } from "react";
import { useSettingsContext } from "../settings/settingsContext";

export const ApolloClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuthenticationContext();
  const { graphqlUrl } = useSettingsContext();

  const client = useMemo(() => {
    return getApolloClient(
      graphqlUrl,
      user?.jwt_token,
      { organization_id: user?.organization_id?.toString() },
      window.__APOLLO_STATE__,
    );
  }, [user?.jwt_token, user?.organization_id, graphqlUrl]);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
