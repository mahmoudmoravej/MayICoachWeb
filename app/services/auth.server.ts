import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";

import type { User } from "~/models/user";
import { googleStrategy } from "./auth.strategies/google";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage, {
  sessionKey: "accessToken",
});

authenticator.use(googleStrategy, "google");
