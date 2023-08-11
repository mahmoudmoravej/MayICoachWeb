import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: process.env.GRAPHQL_SCHEMA_URL || "GRAPHQL_SCHEMA_URL IS NOT SET",
  documents: ["app/**/*.graphql"],
};

export default config;
