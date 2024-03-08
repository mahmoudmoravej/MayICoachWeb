import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

//NOTE! This function will be called on both client and server side.
export function getApolloClient(
  url: string | null | undefined,
  token: string | null | undefined,
  headers:
    | {
        organization_id?: string | undefined;
        sign_up?: string | undefined;
      }
    | null
    | undefined,
  cache: any = null,
) {
  const isServer = typeof window === "undefined";

  const organization_header = headers?.organization_id
    ? { "X-Org-Id": headers.organization_id }
    : null;

  const signup_header =
    headers?.sign_up != undefined ? { "X-Sign-Up": headers.sign_up } : null;

  const linkSettings = {
    uri: url || "GRAPHQL_SCHEMA_URL IS NOT SET",
    headers: {
      Authorization: `Bearer ${token ?? "ERROR TOKEN!"}`,
      ...organization_header,
      ...signup_header,
    },
    ...(isServer && { credentials: "include" }), // or "same-origin" if your backend server is the same domain
  };

  const client = new ApolloClient({
    cache: cache ? new InMemoryCache().restore(cache) : new InMemoryCache(),
    link: createHttpLink(linkSettings),
    defaultOptions: {
      query: {
        fetchPolicy: "network-only",
      },
    },
    ssrMode: true,
    ssrForceFetchDelay: 1000, // we need this to help ssr with network-only works as expected. so we don;'t see extra queries on the client side.
  });

  return client;
}

export function signOutClient(client: ApolloClient<any>) {
  client.resetStore();
}

export function getPureObject<T extends { __typename?: any }>(
  object: T | null | undefined,
): Omit<T, "__typename"> | null | undefined {
  if (!object) return object;
  const { __typename, ...pureObject } = object;
  return pureObject;
}

export function noNull<T>(value: T | null): value is NonNullable<T> {
  return value !== null;
}
export type AuthenticationErrorMessage = {
  message: string;
  organization_id?: number;
};

export function parseAuthenticationMessage(
  message: string,
): AuthenticationErrorMessage {
  try {
    return JSON.parse(message) as AuthenticationErrorMessage;
  } catch (error) {
    return { message };
  }
}

export function buildAuthenticationMessage(
  message: AuthenticationErrorMessage,
) {
  return JSON.stringify(message);
}
