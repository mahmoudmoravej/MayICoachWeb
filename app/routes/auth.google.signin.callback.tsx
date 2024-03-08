import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { AuthorizationError } from "remix-auth";

import { authenticator } from "~/services/auth.server";
import { parseAuthenticationMessage } from "~/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    return await authenticator.authenticate("google", request, {
      successRedirect: "/individuals/me/coach",
      throwOnError: true, // https://github.com/sergiodxa/remix-auth?tab=readme-ov-file#errors-handling
    });
  } catch (error) {
    if (error instanceof Response) return error;
    else if (error instanceof AuthorizationError) {
      const errorMessageDetails = parseAuthenticationMessage(error.message);

      return redirect(
        errorMessageDetails.organization_id != null
          ? `/signin/${errorMessageDetails.organization_id}`
          : "/signin",
        {
          headers: {
            "Set-Cookie": "signin-error=unauthorized; Path=/",
          },
        },
      );
    }
  }
}
