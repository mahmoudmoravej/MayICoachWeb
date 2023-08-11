// eslint-disable-next-line import/no-extraneous-dependencies
import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:5225/graphql/",
  documents: ["app/**/*.graphql"],
  generates: {
    "./app/@types/graphql.ts": {
      // preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
