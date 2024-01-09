import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Settings } from "~/models/settings";
import { siteRoutes } from "~/routesData";
import { SiteNavbar } from "~/widgets/layout";

export async function loader({ request }: LoaderFunctionArgs) {
  const settings: Settings = { graphql_url: process.env.GRAPHQL_SCHEMA_URL! };
  return { settings };
}

function useSettings() {
  const data = useLoaderData<{ settings: Settings }>();
  return data.settings;
}

export default function Site() {
  const settings = useSettings();

  useEffect(() => {
    sessionStorage.setItem("graphql_url", settings.graphql_url);
  }, [settings.graphql_url]);

  return (
    <>
      <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
        <SiteNavbar routes={siteRoutes} />
      </div>

      <Outlet />
    </>
  );
}
