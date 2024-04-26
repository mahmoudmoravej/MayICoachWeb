import dotenv from "dotenv";

// eslint-disable-next-line import/no-extraneous-dependencies
import { type CodegenConfig } from "@graphql-codegen/cli";

dotenv.config();
const url = process.env.GRAPHQL_SCHEMA_URL || "GRAPHQL_SCHEMA_URL IS NOT SET";

const config: CodegenConfig = {
  schema: url,
  documents: ["app/**/*.graphql", "app/**/*.gql"], //try to find these files and generate the following based on them
  generates: {
    "./app/@types/graphql/schema.ts": {
      // preset: "client", we don't need gql version
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo", //help on this plugin: https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-apollo
      ],
      config: {
        withHooks: true,
        // useTypeImports: true,
        // emitLegacyCommonJSImports: true,
      },
    },
  },
};

export default config;
