import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { installGlobals } from "@remix-run/node";

installGlobals();

const viteConfig = defineConfig({
  plugins: [remix(), tsconfigPaths()],
  server: {
    port: 4000,
  },
});

export default viteConfig;
