import { getApolloClient } from "~/utils";
import { ApolloProvider } from "@apollo/client";
import { useAuthenticationContext } from "../authentication/authenticationContext";
import { useMemo } from "react";

export const AppApolloProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuthenticationContext();

  const client = useMemo(() => {
    console.log("Client is created!!!"); //TODO:
    return getApolloClient(
      sessionStorage.getItem("graphql_url"),
      user?.jwt_token,
      user?.organization_id?.toString(),
      window.__APOLLO_STATE__,
    );
  }, [user?.jwt_token, user?.organization_id]);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
