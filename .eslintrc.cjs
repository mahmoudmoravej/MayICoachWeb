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

/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },

  // Base config
  extends: ["eslint:recommended"],

  overrides: [
    // React
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_" },
        ],
      },
      plugins: ["react", "jsx-a11y"],
      extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      settings: {
        react: {
          version: "detect",
        },
        formComponents: ["Form"],
        linkComponents: [
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" },
        ],
        "import/resolver": {
          typescript: {},
        },
      },
    },

    // Typescript
    {
      files: ["**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint", "import"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/internal-regex": "^~/",
        "import/resolver": {
          node: {
            extensions: [".ts", ".tsx"],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
      ],
    },

    // Node
    {
      files: [".eslintrc.cjs"],
      env: {
        node: true,
      },
    },
  ],
};
