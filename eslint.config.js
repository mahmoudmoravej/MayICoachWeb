/** @type {import('eslint').Linter.Config} */

import * as graphqlESLint from "@graphql-eslint/eslint-plugin";
import js from "@eslint/js";
// import * as eslintConfig from "@remix-run/eslint-config"
// import * as eslintConfigNode from "@remix-run/eslint-config/node"

export default [
  // eslintConfig,
  {
    files: ["**/*.js"],
    rules: js.configs.recommended.rules,
  },
  {
    files: ["**/*.graphql"],
    plugins: {
      "@graphql-eslint": graphqlESLint,
    },
    languageOptions: {
      parser: graphqlESLint,
    },
    rules: {
      "@graphql-eslint/no-anonymous-operations": "error",
      "@graphql-eslint/no-duplicate-fields": "error",
    },
  },
];

// /** @type {import('eslint').Linter.Config} */
// // const graphqlESLint = require("@graphql-eslint/eslint-plugin");

// module.exports = { extends:[ "@remix-run/eslint-config",
//   "@remix-run/eslint-config/node"],
//   {
//     files: ["**/*.graphql"],
//     plugins: ["@graphql-eslint"],
//     languageOptions: {
//       parser: "@graphql-eslint/eslint-plugin",
//     },
//     rules: {
//       "@graphql-eslint/no-anonymous-operations": "error",
//       "@graphql-eslint/no-duplicate-fields": "error",
//     },
//   },
// };

// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//     node: true,
//   },
//   extends: [
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended",
//     "plugin:react/recommended",
//   ],
//   overrides: [
//     {
//       env: {
//         node: true,
//       },
//       files: [".eslintrc.{js,cjs}"],
//       parserOptions: {
//         sourceType: "script",
//       },
//     },
//   ],
//   parser: "@typescript-eslint/parser",
//   parserOptions: {
//     ecmaVersion: "latest",
//     sourceType: "module",
//   },
//   plugins: ["@typescript-eslint", "react"],
//   rules: {
//     indent: ["error", 4],
//     "linebreak-style": ["error", "unix"],
//     quotes: ["error", "double"],
//     semi: ["error", "never"],
//   },
// };
