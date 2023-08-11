/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import { PassThrough, Transform } from "node:stream";

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { renderToString } from "react-dom/server";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";

const ABORT_DELAY = 5_000;

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

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(body, {
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
    const client = new ApolloClient({
      ssrMode: true,
      cache: new InMemoryCache(),
      link: createHttpLink({
        uri: process.env.GRAPHQL_SCHEMA_URL || "GRAPHQL_SCHEMA_URL IS NOT SET", // from Apollo's Voyage tutorial series (https://www.apollographql.com/tutorials/voyage-part1/)
        headers: Object.fromEntries(request.headers),
        credentials: request.credentials ?? "include", // or "same-origin" if your backend server is the same domain
      }),
    });

    let shellRendered = false;

    const App = (
      <ApolloProvider client={client}>
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />
      </ApolloProvider>
    );

    await getDataFromTree(App);

    const { pipe, abort } = renderToPipeableStream(App, {
      onShellReady() {
        shellRendered = true;
        const body = new PassThrough();

        var state = new Transform({
          transform(chunk, encoding, callback) {
            callback(null, chunk);
          },
          flush(callback) {
            // Extract the entirety of the Apollo Client cache's current state
            const initialState = client.extract();

            this.push(
              `<script>window.__APOLLO_STATE__=${JSON.stringify(
                initialState,
              ).replace(/</g, "\\u003c")}</script>`,
            );
            callback();
          },
        });

        responseHeaders.set("Content-Type", "text/html");

        resolve(
          new Response(body, {
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
    });

    setTimeout(abort, ABORT_DELAY);
  });
}
