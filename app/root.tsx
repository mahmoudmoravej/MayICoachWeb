import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";

import { getMuiLinks } from "./mui/getMuiLinks";
import { getMuiMeta } from "./mui/getMuiMeta";
import { MuiDocument } from "./mui/MuiDocument";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },

  ...getMuiLinks(),
];

export const meta: MetaFunction = () => [...getMuiMeta()];

export default function App() {
  return (
    <MuiDocument>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MuiDocument>
  );
}
