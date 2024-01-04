import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export let loader = ({ request }: LoaderFunctionArgs) => {
  return authenticator.authenticate("google", request, {
    successRedirect: "/individuals",
    // failureRedirect: "/login?error", we ingore using it now and we prefer to see the exception. later we should fix it.
    // https://github.com/sergiodxa/remix-auth?tab=readme-ov-file#errors-handling
  });
};
