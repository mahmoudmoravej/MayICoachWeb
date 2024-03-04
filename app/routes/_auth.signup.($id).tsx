import { Form, useLoaderData } from "@remix-run/react";

import { Alert, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import cookie from "cookie";

import { LoaderFunctionArgs, json } from "@remix-run/node";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export function loader({ params, request }: LoaderFunctionArgs) {
  const organization_id = params.id;

  const cookieString = request.headers.get("cookie") ?? "";
  const signupError = cookie.parse(cookieString)["signup-error"];

  return json(
    {
      error: signupError,
    },
    {
      headers: [
        ["Set-Cookie", setClearErrorCookie()],
        ["Set-Cookie", getAuthenticationOrganizationCookie(organization_id)],
      ],
    },
  );
}
function setClearErrorCookie(): string {
  return "signup-error=; Path=/; Max-Age=0";
}

function getAuthenticationOrganizationCookie(organization_id?: string): string {
  // TODO: we later remove this as we get the org by subdomain or even the email addrees
  return `auth_signup_organization_id=${organization_id}; Path=/; ${
    organization_id ? "" : "Max-Age=0"
  }`;
}

export function SignUp() {
  const { error: signUpError } = useLoaderData<typeof loader>();

  const errorMarkup = signUpError && (
    <Alert
      color="amber"
      icon={<ExclamationTriangleIcon className="h-5 w-5 text-inherit" />}
    >
      {signUpError == "unauthorized" ? (
        <>
          You are not authorized! You have to{" "}
          <Link to="/signup" className="hover:underline">
            sign up
          </Link>{" "}
          first.
        </>
      ) : (
        signUpError
      )}
    </Alert>
  );

  return (
    <section className="m-8 flex gap-4">
      <div className="mt-24 w-full lg:w-3/5">
        <div className="text-center">
          <Typography variant="h2" className="mb-4 font-bold">
            Sign Up
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Select your way to sign up.
          </Typography>
        </div>
        <div className="mx-auto mb-2 mt-8 w-80 max-w-screen-lg lg:w-1/2">
          <div className="mt-8 space-y-4">
            {errorMarkup}
            <Form action={`/auth/google/signup`} method="post">
              <Button
                size="lg"
                color="white"
                className="flex items-center justify-center gap-2 shadow-md"
                fullWidth
                type="submit"
              >
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1156_824)">
                    <path
                      d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z"
                      fill="#34A853"
                    />
                    <path
                      d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z"
                      fill="#FBBC04"
                    />
                    <path
                      d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z"
                      fill="#EA4335"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1156_824">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span>Sign up With Google</span>
              </Button>
            </Form>
            <Button
              size="lg"
              color="white"
              className="flex items-center justify-center gap-2 shadow-md"
              fullWidth
            >
              <img
                src="/images/twitter-logo.svg"
                height={24}
                width={24}
                alt=""
              />
              <span>Sign up With Twitter</span>
            </Button>
          </div>
          <Typography
            variant="paragraph"
            className="mt-4 text-center font-medium text-blue-gray-500"
          >
            Already have an account?
            <Link to="/signin" className="ml-1 text-gray-900">
              Sign in
            </Link>
          </Typography>
        </div>
      </div>
      <div className="hidden h-full w-2/5 lg:block">
        <img
          src="/images/pattern.png"
          className="h-full w-full rounded-3xl object-cover"
          alt=""
        />
      </div>
    </section>
  );
}

export default SignUp;
