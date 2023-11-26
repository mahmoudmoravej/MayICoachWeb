import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon } from "@heroicons/react/24/solid";
import { PageTitle, FirstPageFooter as Footer } from "~/widgets/layout";
import { FeatureCard, TeamCard } from "~/widgets/cards";

import { teamData, featuresData, contactData } from "~/routesData";

export function Home() {
  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pb-32 pt-16">
        <div className="absolute top-0 h-full w-full bg-[url('/images/pattern.png')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                AI as your coaching assistant!
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                This is a simple example of a Landing Page you can build using
                Material Tailwind. It features multiple components based on the
                Tailwind CSS and Material Design by Google.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                <FingerPrintIcon className="h-8 w-8 text-white " />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Working with us is a pleasure
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                Don't let your uses guess by attaching tooltips and popoves to
                any element. Just make sure you enable them first via
                JavaScript.
                <br />
                <br />
                The kit comes with three pre-built pages to help you get started
                faster. You can change the text and images and you're good to
                go. Just make sure you enable them first via JavaScript.
              </Typography>
              <Button variant="filled">read more</Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="rounded-lg border shadow-lg shadow-gray-500/10">
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt="Card"
                    src="/images/teamwork.png"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    Enterprise
                  </Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                  >
                    Top Notch Services
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pb-48 pt-20">
        <div className="container mx-auto">
          <PageTitle section="Our Team" heading="Here are our heroes">
            According to the National Oceanic and Atmospheric Administration,
            Ted, Scambos, NSIDClead scentist, puts the potentially record
            maximum.
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-xl fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
      <section className="relative bg-white px-4 py-24">
        <div className="container mx-auto">
          <PageTitle section="Co-Working" heading="Build something">
            Put the potentially record low maximum sea ice extent tihs year down
            to low ice. According to the National Oceanic and Atmospheric
            Administration, Ted, Scambos.
          </PageTitle>
          <div className="mx-auto mb-48 mt-20 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
              <Card
                key={title}
                color="transparent"
                shadow={false}
                className="text-center text-blue-gray-900"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                  {React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>
          <PageTitle section="Contact Us" heading="Want to work with us?">
            Complete this form and we will get back to you in 24 hours.
          </PageTitle>
          <form className="mx-auto mt-12 w-full lg:w-5/12">
            <div className="mb-8 flex gap-8">
              <Input
                variant="outlined"
                size="lg"
                label="Full Name"
                crossOrigin={undefined}
              />
              <Input
                variant="outlined"
                size="lg"
                label="Email Address"
                crossOrigin={undefined}
              />
            </div>
            <Textarea variant="outlined" size="lg" label="Message" rows={8} />
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
              crossOrigin={undefined}
            />
            <Button variant="gradient" size="lg" className="mt-8" fullWidth>
              Send Message
            </Button>
          </form>
        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
// import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
// import { Form, Link, useLoaderData } from "@remix-run/react";
// import { useEffect } from "react";
// import type { User } from "~/models/user";

// import { authenticator } from "~/services/auth.server";

// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };

// export async function loader({ request }: LoaderFunctionArgs) {
//   let user = await authenticator.isAuthenticated(request);
//   return { user };
// }

// function useUser() {
//   const data = useLoaderData<{ user?: User }>();
//   return data.user;
// }

// export default function Index() {
//   const user = useUser();

//   useEffect(() => {
//     //TODO: it is a temporary solution, we need to remove token at logout and also store token at login.

//     if (user) sessionStorage.setItem("token", user.jwt_token);
//     else sessionStorage.removeItem("token");
//   });

//   return (
//     <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
//       <div className="relative sm:pb-16 sm:pt-8">
//         <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
//             <div className="absolute inset-0">
//               <img
//                 className="h-full w-full object-cover"
//                 src="https://user-images.githubusercontent.com/1500684/157774694-99820c51-8165-4908-a031-34fc371ac0d6.jpg"
//                 alt="Sonic Youth On Stage"
//               />
//               <div className="absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" />
//             </div>
//             <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
//               <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
//                 <span className="block uppercase text-yellow-500 drop-shadow-md">
//                   Performa
//                 </span>
//               </h1>
//               <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
//                 Check the README.md file for instructions on how to get this
//                 project deployed.
//               </p>
//               <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
//                 {user ? (
//                   <>
//                     <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
//                       Welcome {user.name}!
//                     </p>
//                     <div>
//                       <Link
//                         to="/managers"
//                         className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
//                       >
//                         Managers
//                       </Link>
//                       <Link
//                         to="/logout"
//                         className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
//                       >
//                         Sign out
//                       </Link>
//                     </div>
//                   </>
//                 ) : (
//                   <div className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
//                     <Link
//                       to="/login"
//                       className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
//                     >
//                       Log in
//                     </Link>
//                     <Form action="/auth/google" method="post">
//                       <button>
//                         <img
//                           src="/images/btn_google_signin_light_normal_web.png"
//                           alt="login with google"
//                         />
//                       </button>
//                     </Form>
//                   </div>
//                 )}
//               </div>{" "}
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
