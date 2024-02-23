import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export function getApolloClient(
  request: Request,
  token: string | undefined,
  organization_id: string | undefined,
) {
  const organization_header = organization_id
    ? { "X-Org-Id": organization_id }
    : null;

  const linkSettings = {
    uri: process.env.GRAPHQL_SCHEMA_URL || "GRAPHQL_SCHEMA_URL IS NOT SET",
    headers: {
      // ...Object.fromEntries(request.headers), it is not a good way. It will cause in deployment on render.com.
      Authorization: `Bearer ${token ?? "ERROR TOKEN!"}`,
      ...organization_header,
    },
    credentials: "include", // or "same-origin" if your backend server is the same domain
  };

  const client = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: createHttpLink(linkSettings),
  });

  return client;
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
