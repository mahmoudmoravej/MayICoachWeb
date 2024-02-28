import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { AuthorizationError } from "remix-auth";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    return await authenticator.authenticate("google", request, {
      successRedirect: "/individuals/me/coach",
      throwOnError: true, // https://github.com/sergiodxa/remix-auth?tab=readme-ov-file#errors-handling
    });
  } catch (error) {
    if (error instanceof Response) return error;
    if (error instanceof AuthorizationError) {
      return redirect("/signin", {
        headers: {
          "Set-Cookie": "signin-error=unauthorized; Path=/",
        },
      });
    }
  }
}
