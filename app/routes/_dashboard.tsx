import { Outlet } from "@remix-run/react";

import { Sidenav, DashboardTopNavbar, Footer } from "~/widgets/layout";
import { getRoutes } from "~/routesData";
import { useAuthenticationContext } from "~/contexts/authentication/authenticationContext";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  let user = await authenticator.isAuthenticated(request);
  if (!user && request.url.indexOf("/signin") == -1) return redirect("/signin"); //TODO: any danger of infinite loop?

  return {};
}

export default function Dashboard() {
  //TODO: change the followings to get value from settings context
  const sidenavType = getRoutes == null ? "dark" : "white"; // this fake comparison is to avoid TS error only.
  const { user } = useAuthenticationContext();

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={getRoutes(user)}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardTopNavbar />
        {/* <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => {}}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton> */}
        <Outlet />
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}
