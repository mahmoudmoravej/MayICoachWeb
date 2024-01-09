import { Outlet, useLoaderData } from "@remix-run/react";
import { IconButton } from "@material-tailwind/react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

import { Sidenav, DashboardNavbar, Footer } from "~/widgets/layout";
import routes from "~/routesData";
import { authenticator } from "~/services/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useEffect } from "react";
import { User } from "~/models/user";
import { Settings } from "~/models/settings";

export async function loader({ request }: LoaderFunctionArgs) {
  let user = await authenticator.isAuthenticated(request);
  const settings: Settings = { graphql_url: process.env.GRAPHQL_SCHEMA_URL! };
  return { user, settings };
}

function useUser() {
  const data = useLoaderData<{ user?: User; settings: Settings }>();
  return data.user;
}

function useSettings() {
  const data = useLoaderData<{ user?: User; settings: Settings }>();
  return data.settings;
}

export default function Dashboard() {
  //TODO: change the followings to get value from context
  const sidenavType = routes == null ? "dark" : "white"; // this fake comparison is to avoid TS error only.
  const user = useUser();
  const settings = useSettings();

  useEffect(() => {
    sessionStorage.setItem("graphql_url", settings.graphql_url);
  }, [settings.graphql_url]);

  useEffect(() => {
    //TODO: it is a temporary solution, we need to remove token at logout and also store token at login.

    if (user) sessionStorage.setItem("token", user.jwt_token);
    else sessionStorage.removeItem("token");
  });

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => {}}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Outlet />
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}
