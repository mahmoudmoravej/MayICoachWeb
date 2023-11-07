/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "off",
  },
};

// NOTE!!!!
// THE FOLLOWING ARE FOR FLAT VERSION WHICH IS NOT WORKING.eslint.config.js
// WE IGNORE ESLINTING FOR NOW

// import * as graphqlESLint from "@graphql-eslint/eslint-plugin";
// import js from "@eslint/js";

// export default [
//   {
//     files: ["**/*.js"],
//     rules: js.configs.recommended.rules,
//   },
//   {
//     files: ["**/*.graphql"],
//     plugins: {
//       "@graphql-eslint": graphqlESLint,
//     },
//     languageOptions: {
//       parser: graphqlESLint,
//     },
//     rules: {
//       "@graphql-eslint/no-anonymous-operations": "error",
//       "@graphql-eslint/no-duplicate-fields": "error",
//     },
//   },
//   {
//     ignores: ["build/*", "node_modules/*", "public/*"],
//   },
// ];
