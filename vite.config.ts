import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { installGlobals } from "@remix-run/node";
import { cjsInterop } from "vite-plugin-cjs-interop";

installGlobals();

const viteConfig = defineConfig({
  plugins: [
    cjsInterop({
      // List of CJS dependencies that require interop
      dependencies: ["@material-tailwind/react"],
    }),
    remix(),
    tsconfigPaths(),
  ],
  server: {
    port: 4000,
  },
});

export default viteConfig;
