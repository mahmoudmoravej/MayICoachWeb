import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: "http://localhost:5225/graphql/",
  documents: ["app/**/*.graphql"],
};

export default config;
