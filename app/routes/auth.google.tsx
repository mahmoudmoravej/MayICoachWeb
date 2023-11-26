import { type ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

// export let loader = () => redirect("/login");

export async function action({ request }: ActionFunctionArgs) {
  return authenticator.authenticate("google", request, {
    successRedirect: "/managers",
  });
}
