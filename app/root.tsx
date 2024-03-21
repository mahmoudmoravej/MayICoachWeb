import { cssBundleHref } from "@remix-run/css-bundle";
import stylesheet from "~/tailwind.css";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { getMuiLinks } from "./mui/getMuiLinks";
import { MuiMeta } from "./mui/MuiMeta";
import { LinksFunction } from "@remix-run/node";
import { MuiDocument } from "./mui/MuiDocument";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },

  ...getMuiLinks(),
];
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <MuiMeta />
        <Links />
      </head>
      <body>
        <MuiDocument>
          <Outlet />
        </MuiDocument>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// export default function Apps() {
//   return (
//     <>
//       <MuiDocument>
//         <Outlet />
//       </MuiDocument>
//     </>
//   );
// }
