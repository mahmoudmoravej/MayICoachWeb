/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import { PassThrough, Transform } from "node:stream";

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";

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
            new Response(createReadableStreamFromReadable(body), {
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
    const token =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1ZjRiZjQ2ZTUyYjMxZDliNjI0OWY3MzA5YWQwMzM4NDAwNjgwY2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDU3NjQyODgyNDkxLTk5ZjdzYXFxdmhuNTZzZ3I2NGtqaWVpa2FkcWFqOGU1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA1NzY0Mjg4MjQ5MS05OWY3c2FxcXZobjU2c2dyNjRramllaWthZHFhajhlNS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMjUyODE0NDM5OTU0Njg1MDQ2MCIsImVtYWlsIjoibW9yYXZlakBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImZpWjN1bm5XN1g3RjNVQlZsMy1tNlEiLCJuYW1lIjoiTWFobW91ZCBNb3JhdmVqIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pLYjlLMjFnWlBGSVVCTXlYSkFSVVA1ckV2TFRQcnNsb0hGQVAzb3FkQj1zOTYtYyIsImdpdmVuX25hbWUiOiJNYWhtb3VkIiwiZmFtaWx5X25hbWUiOiJNb3JhdmVqIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2OTg5NTk5MDEsImV4cCI6MTY5ODk2MzUwMX0.FINpUhQJqKdcwNTAX6y6zvaLwYvYmd8iHxmwpkbD9MSKAKlKsvesmN77ZlLYaoMMx8MfiwMrJpKe1pEjW08U21ZmOAUvicZHXTNd8PqpkkFBq10hDw0892SXyiB4Y6AmJc0DubPQqgbL4m6asniqS6Uxz9VHM-BqygEaeLdvup5SqsGZOhGp8XsfvPvlrKWymLkQOZNmrtvN6RA6AW7wCf_WLPEgVMFxT2jdc9pbOoT1osS5pCOcGMBvdcTSMoMDgRq6xO17AXB9Qbc91L-5dB0ly9jx6_AnxksMDboJ3lLZCIj-cEQQCAWPi-xDLVmWqnqxeqQZB_PIs3gU2hettQ";

    const client = new ApolloClient({
      ssrMode: true,
      cache: new InMemoryCache(),
      link: createHttpLink({
        uri: process.env.GRAPHQL_SCHEMA_URL || "GRAPHQL_SCHEMA_URL IS NOT SET", // from Apollo's Voyage tutorial series (https://www.apollographql.com/tutorials/voyage-part1/)
        headers: {
          ...Object.fromEntries(request.headers),
          Authorization: `Bearer ${token}`,
        },
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
          new Response(createReadableStreamFromReadable(body), {
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
