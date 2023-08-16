import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: "http://localhost:5225/graphql/",
  documents: ["app/**/*.graphql"],
  //   generates: {
  //     "app/@types/": {
  //       preset: "client",
  //     },
  //     "./graphql.schema.json": {},
  //   },
  // ignoreNoDocuments: true,
};

export default config;
