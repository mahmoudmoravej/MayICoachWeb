# Welcome to mAy I Coach?!

## Development

From your terminal:

```sh
yarn dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
yarn build
```

Then run the app in production mode:

```sh
yarn start
```

Now you'll need to pick a host to deploy it to.

### Deploy in Vercel

- Url: https://vercel.com/mahmoudmoravejs-projects/may-i-coach-web

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over relevant code/assets from your current app to the new project that's pre-configured for your target server.

Most importantly, this means everything in the `app/` directory, but if you've further customized your current application outside of there it may also include:

- Any assets you've added/updated in `public/`
- Any updated versions of root files such as `.eslintrc.js`, etc.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```

## Generate GraphQL types

run `yarn graphql` .

- Note: You need to have the API server mentioned in process.env.GRAPHQL_SCHEMA_URL run.
- The configuration of generator comes from: https://the-guild.dev/graphql/codegen
- It reads all the \*.graphql files in your repo and generates hook for them.
- GraphQL.config is for linting graphql files.

if it fails, run `yarn graphql --verbose`
configurations are in: graphql.codegen.ts
Note: GraphQL is introspective. This means you can query a GraphQL schema for details about itself.

## Helps / Docs

- GraphQL Integration
  - https://www.apollographql.com/blog/apollo-client/how-to-use-apollo-client-with-remix/
- Authentication:
  - Remix Auth: https://github.com/sergiodxa/remix-auth
  - Google Auth Strategy: https://github.com/pbteja1998/remix-auth-google

# Icons:

- HeroIcons React: https://github.com/tailwindlabs/heroicons#react

# Layouting and Dashboard:

Mostly comes from creative-tim. (https://www.creative-tim.com/product/material-tailwind-dashboard-react#)
Main page:

- https://github.com/creativetimofficial/material-tailwind-kit-react

  Dashboard:

- https://github.com/creativetimofficial/material-tailwind-dashboard-react
- How to have multiple layout: https://github.com/remix-run/remix/discussions/7296

# TODOs

Check todos here: https://github.com/mahmoudmoravej/testui/issues/2
