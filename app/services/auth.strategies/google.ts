import {
  GetLoggedInUserInfoDocument,
  GetLoggedInUserInfoQuery,
} from "@app-types/graphql";
import { AuthorizationError } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import type { User } from "~/models/user";
import { getApolloClient } from "~/utils";

export let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    callbackURL: "/auth/google/callback",
  },
  async ({ accessToken, refreshToken, extraParams, profile, request }) => {
    // Get the user data from your DB or API using the tokens and profile
    const jwt_token = extraParams.id_token;

    try {
      const client = getApolloClient(request, jwt_token);
      const result = await client.query<GetLoggedInUserInfoQuery>({
        query: GetLoggedInUserInfoDocument,
        fetchPolicy: "network-only",
      });

      const myInfo = result.data?.myInfo;
      if (myInfo === undefined || result.error || result.errors)
        throw new Error("No user info found");

      const individual = myInfo?.Individual;

      return {
        email: profile.emails[0].value,
        jwt_token: jwt_token,
        name: profile.displayName,
        individual_id: individual?.id,
        user_id: myInfo.UserId,
        is_manager: individual?.isManager,
      } as User;
    } catch (error: any) {
      const msg =
        "Error fetching loggined in user info through API: " + error.message;
      console.error(msg);
      throw new AuthorizationError(msg);
    }
  },
);
