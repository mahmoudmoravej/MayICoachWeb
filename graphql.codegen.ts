import dotenv from "dotenv";

// eslint-disable-next-line import/no-extraneous-dependencies
import { type CodegenConfig } from "@graphql-codegen/cli";

dotenv.config();
const url = process.env.GRAPHQL_SCHEMA_URL || "GRAPHQL_SCHEMA_URL IS NOT SET";

const config: CodegenConfig = {
  schema: url,
  documents: ["app/**/*.graphql"],
  generates: {
    "./app/@types/graphql.ts": {
      // preset: "client", we don't need gql version
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
