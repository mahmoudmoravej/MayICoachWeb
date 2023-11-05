import { GoogleStrategy } from "remix-auth-google";
import type { User } from "~/models/user";

export let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    callbackURL: "/auth/google/callback",
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile

    return {
      email: profile.emails[0].value,
      jwt_token: extraParams.id_token,
      name: profile.displayName,
    } as User;
  },
);
