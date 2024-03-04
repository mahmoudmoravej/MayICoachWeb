import { Outlet } from "react-router-dom";
import { siteRoutes } from "~/routesData";
import { SiteNavbar } from "~/widgets/layout";

export default function Site() {
  return (
    <>
      <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
        <SiteNavbar routes={siteRoutes} />
      </div>

      <Outlet />
    </>
  );
}
