import {
  GetLoggedInUserInfoDocument,
  GetLoggedInUserInfoQuery,
} from "@app-types/graphql";

import { GoogleStrategy } from "remix-auth-google";
import type { User } from "~/models/user";
import { buildAuthenticationMessage, getApolloClient } from "~/utils";
import cookie from "cookie";
import { AuthorizationError } from "remix-auth";
import "dotenv/config";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    callbackURL: "/auth/google/signin/callback",
    prompt: "select_account",
  },
  async ({
    accessToken,
    refreshToken,
    extraParams,
    profile,
    request,
    context,
  }) => {
    // Get the user data from your DB or API using the tokens and profile
    const jwt_token = extraParams.id_token;

    const cookieString = request.headers.get("cookie") ?? "";
    const organization_id = cookie.parse(cookieString).auth_organization_id; //we should not use this temporary cookie anywhere else

    try {
      const client = getApolloClient(
        process.env.GRAPHQL_SCHEMA_URL,
        jwt_token,
        { organization_id },
      );
      const result = await client.query<GetLoggedInUserInfoQuery>({
        query: GetLoggedInUserInfoDocument,
        fetchPolicy: "network-only",
      });

      const individual = result.data?.myInfo;

      if (individual === undefined || result.error || result.errors)
        throw new Error("No user info found");

      const user: User = {
        email: profile.emails[0].value,
        jwt_token: jwt_token,
        name: profile.displayName,
        individual_id: individual.id,
        is_manager: individual.isManager,
        organization_id: individual.organization.id,
        isPersonalOrganization: individual.organization.isPersonal,
      };
      return user;
    } catch (error: any) {
      const errorMsg = buildAuthenticationMessage({
        organization_id: parseInt(organization_id),
        message:
          "Error fetching loggined in user info through API. Details: " +
          JSON.stringify({ url: process.env.GRAPHQL_SCHEMA_URL, error: error }),
      });

      console.error(errorMsg);
      throw new AuthorizationError(errorMsg, error);
    }
  },
);
