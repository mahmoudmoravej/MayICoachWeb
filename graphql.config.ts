import type { IGraphQLConfig } from "graphql-config";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const config: IGraphQLConfig = {
  schema: process.env.GRAPHQL_SCHEMA_URL || "GRAPHQL_SCHEMA_URL IS NOT SET", //TODO: We need to replace it with static file later
  documents: ["app/**/*.graphql"],
};

export default config;
