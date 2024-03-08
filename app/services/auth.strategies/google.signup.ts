import {
  SignUpMutation,
  SignUpDocument,
  SignUpMutationVariables,
} from "@app-types/graphql";

import { GoogleStrategy } from "remix-auth-google";
import type { User } from "~/models/user";
import { buildAuthenticationMessage, getApolloClient } from "~/utils";
import cookie from "cookie";
import { AuthorizationError } from "remix-auth";

export const googleSignUpStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    callbackURL: "/auth/google/signup/callback",
    prompt: "consent",
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
    const organization_id = parseInt(
      cookie.parse(cookieString).auth_signup_organization_id,
    ); //we should not use this temporary cookie anywhere else

    try {
      const client = getApolloClient(
        process.env.GRAPHQL_SCHEMA_URL,
        jwt_token,
        { sign_up: "1" },
      );

      const result = await client.mutate<
        SignUpMutation,
        SignUpMutationVariables
      >({
        mutation: SignUpDocument,
        variables: {
          input: {
            signUpInput: {
              organizationId:
                organization_id >= 0 ? organization_id : undefined,
            },
          },
        },
      });

      const individual = result.data?.signUp?.individual;

      if (individual === undefined || result.errors)
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
      const msg =
        "Error sign up through API. Details: " +
        JSON.stringify({ url: process.env.GRAPHQL_SCHEMA_URL, error: error });
      console.error(msg);

      const errorMsg = buildAuthenticationMessage({
        organization_id,
        message: error.graphQLErrors
          ? error.graphQLErrors[0].message
          : "unauthorized",
      });

      throw new AuthorizationError(errorMsg, error);
    }
  },
);
