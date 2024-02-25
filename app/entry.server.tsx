/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import { PassThrough } from "node:stream";

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";

import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { authenticator } from "./services/auth.server";
import type { ReactElement } from "react";
import * as utils from "./utils";
import {
  AuthenticationContext,
  AuthenticationClientProvider,
  AuthenticationServerProvider,
  ApolloServerProvider,
} from "./contexts";
import { User } from "./models/user";

const ABORT_DELAY = 5_000;
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //TODO: remove this line. It is dangerous. We have it because there is an issue with the SSL certificate chain of render.com in production
// var sslRootCAs = require("ssl-root-cas/latest");
// sslRootCAs.inject();

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext,
) {
  return isbot(request.headers.get("user-agent"))
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
      );
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise(async (resolve, reject) => {
    let shellRendered = false;

    const { pipe, abort } = renderToPipeableStream(
      await wrapRemixServerWithApollo(
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />,
        request,
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
async function wrapRemixServerWithApollo(
  remixServer: ReactElement,
  request: Request,
) {
  const user = await authenticator.isAuthenticated(request);
  const client = await buildApolloClient(user);

  const app = getServerApp(user, client, remixServer);

  await getDataFromTree(app);
  const initialState = client.extract();

  const appWithData = (
    <>
      {app}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.__APOLLO_STATE__=${serializeState(initialState)}; 
            window.__USER_STATE__=${serializeState(user)}`,
        }}
      />
    </>
  );
  return appWithData;
}

function serializeState(state: any) {
  return JSON.stringify(state).replace(/</g, "\\u003c"); // The replace call escapes the < character to prevent cross-site scripting attacks that are possible via the presence of </script> in a string literal
}

function buildApolloClient(user: User | null) {
  return utils.getApolloClient(
    process.env.GRAPHQL_SCHEMA_URL,
    user?.jwt_token,
    user?.organization_id.toString(),
  );
}

function getServerApp(
  user: User | null,
  client: ApolloClient<NormalizedCacheObject>,
  remixServer: ReactElement,
) {
  return (
    <AuthenticationServerProvider user={user}>
      <ApolloServerProvider client={client}>{remixServer}</ApolloServerProvider>
    </AuthenticationServerProvider>
  );
}
