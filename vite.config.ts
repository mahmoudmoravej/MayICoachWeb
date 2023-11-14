import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const viteConfig = defineConfig({
  plugins: [tsconfigPaths()],
});

export default viteConfig;
