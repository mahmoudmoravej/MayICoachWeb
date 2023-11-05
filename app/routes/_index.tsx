import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import type { User } from "~/models/user";

import { authenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let user = await authenticator.isAuthenticated(request);
  return { user };
}

function useUser() {
  const data = useLoaderData<{ user?: User }>();
  return data.user;
}

export default function Index() {
  const user = useUser();

  useEffect(() => {
    //TODO: it is a temporary solution, we need to remove token at logout and also store token at login.
    console.log("user", user);
    if (user) sessionStorage.setItem("token", user.jwt_token);
    else sessionStorage.removeItem("token");
  });

  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://user-images.githubusercontent.com/1500684/157774694-99820c51-8165-4908-a031-34fc371ac0d6.jpg"
                alt="Sonic Youth On Stage"
              />
              <div className="absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" />
            </div>
            <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-yellow-500 drop-shadow-md">
                  Performa
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                Check the README.md file for instructions on how to get this
                project deployed.
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <>
                    <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                      Welcome {user.name}!
                    </p>
                    <div>
                      <Link
                        to="/managers"
                        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                      >
                        Managers
                      </Link>
                      <Link
                        to="/logout"
                        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                      >
                        Sign out
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                    >
                      Log in
                    </Link>
                    <Form action="/auth/google" method="post">
                      <button>
                        <img
                          src="/images/btn_google_signin_light_normal_web.png"
                          alt="login with google"
                        />
                      </button>
                    </Form>
                  </div>
                )}
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
