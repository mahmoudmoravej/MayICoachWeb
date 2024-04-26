/// <reference types="vite/client" />
/// <reference types="@remix-run/node" />

interface Window {
  __APOLLO_STATE__: any;
  __USER_STATE__: any;
  __GRAPHQLURL__: string;
}
