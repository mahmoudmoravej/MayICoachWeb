import { type ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  return authenticator.authenticate("google", request, {
    successRedirect: "/individuals/me/coach",
  });
}
