// app/services/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node";
import "dotenv/config";

// export the whole sessionStorage object
export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: ["s3cr3t"], // TODO: replace this with an actual secret. Check this: https://github.com/remix-run/indie-stack/blob/a9678c522764cfb6e37268d19c0d273813b9432f/README.md?plain=1#L110
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
});

// you can also export the methods individually for your own usage
export let { getSession, commitSession, destroySession } = sessionStorage;
