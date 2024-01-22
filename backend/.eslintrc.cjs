const fs = require("fs");

const folders = fs
  .readdirSync("src", { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

module.exports = {
  root: true,
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "prettier",
    "plugin:node/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [
    "react",
    "jsx-a11y",
    "@typescript-eslint",
    "import",
    "react-hooks",
    "simple-import-sort",
    "prettier",
    "sort-keys-plus",
    "typescript-sort-keys",
    "promise",
  ],
  overrides: [
    {
      files: ["*.tsx", "*.ts", "*.js", "*.jsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // Packages. `react` related packages come first.
              // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
              ["^\\u0000", "^react$", "^@?\\w"],
              // Absolute imports
              [`^(${folders.join("|")})(/.*|$)`],
              // Relative imports.
              ["^\\."],
              // for scss imports.
              ["^[^.]"],
            ],
          },
        ],
        "no-restricted-globals": 0,
      },
    },
  ],
  rules: {
    // common
    "jsx-a11y/no-autofocus": 0,
    "brace-style": [
      "error",
      "1tbs",
      {
        allowSingleLine: false,
      },
    ],
    curly: "error",
    "no-debugger": "error",
    "curly": ["error", "all"],
    "eqeqeq": ["error", "always"],
    "logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
    "no-lonely-if": "error",
    "no-unneeded-ternary": "error",
    "no-useless-computed-key": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "prefer-template": "error",
    "spaced-comment": ["error", "always", { "markers": ["/"] }],
    "yoda": ["error", "never"],
    "linebreak-style": "error",
    // typescript
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "never",
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: ["typeLike", "enumMember"],
        format: ["PascalCase"],
      },
      {
        selector: ["variable"],
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
      },
      {
        selector: ["function"],
        format: ["camelCase", "PascalCase"],
      },
      {
        selector: "typeParameter",
        format: ["PascalCase"],
      },
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Z]",
          match: false,
        },
      },
    ],
    "@typescript-eslint/lines-between-class-members": ["error", "always"],
    "@typescript-eslint/quotes": ["error", "double", { "avoidEscape": true }],
    "@typescript-eslint/dot-notation": "error",
    "@typescript-eslint/array-type": ["error", { default: "array", readonly: "array" }],
    "@typescript-eslint/consistent-generic-constructors": ["error", "constructor"],
    "@typescript-eslint/consistent-indexed-object-style": "error",
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/no-duplicate-enum-values": "error",
    "@typescript-eslint/no-duplicate-type-constituents": "error",
    "@typescript-eslint/no-invalid-void-type": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-mixed-enums": "error",
    "@typescript-eslint/no-redundant-type-constituents": "error",
    "@typescript-eslint/no-unsafe-declaration-merging": "error",
    "@typescript-eslint/no-useless-empty-export": "error",
    "@typescript-eslint/prefer-enum-initializers": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-literal-enum-member": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    "@typescript-eslint/prefer-regexp-exec": "error",
    "@typescript-eslint/prefer-return-this-type": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/sort-type-constituents": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    // import
    "import/no-anonymous-default-export": "error",
    "import/no-named-as-default-member": "off",
    // react
    "react/jsx-boolean-value": ["error", "never"],
    "react/jsx-closing-bracket-location": "error",
    "react/jsx-pascal-case": "error",
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        ignoreCase: true,
        locale: "auto",
        multiline: "ignore",
        reservedFirst: false,
        shorthandFirst: false,
      },
    ],
    "react/prop-types": "off",
    "react/self-closing-comp": "error",
    "react/function-component-definition": ["error", { "namedComponents": "arrow-function", "unnamedComponents": "arrow-function" }],
    "react/jsx-curly-brace-presence": ["error", { props: "never", children: "always" }],
    "react/jsx-no-useless-fragment": "error",
    // sorting
    "sort-keys-plus/sort-keys": [
      "error",
      "asc",
      {
        allowLineSeparatedGroups: true,
        caseSensitive: false,
        natural: true,
      },
    ],
    "typescript-sort-keys/interface": ["error", "asc", { caseSensitive: false, natural: true }],
    "typescript-sort-keys/string-enum": ["error", "asc", { caseSensitive: false, natural: true }],
    // padding
    "padding-line-between-statements": [
      "error",
      { "blankLine": "always", "prev": "*", "next": "block" },
      { "blankLine": "always", "prev": "block", "next": "*" },
      { "blankLine": "always", "prev": "*", "next": "block-like" },
      { "blankLine": "always", "prev": "block-like", "next": "*" },
      { "blankLine": "always", "prev": "*", "next": "class" },
      { "blankLine": "always", "prev": "class", "next": "*" },
      { "blankLine": "always", "prev": "*", "next": "export" },
      { "blankLine": "always", "prev": "export", "next": "*" },
      { "blankLine": "always", "prev": "*", "next": "expression" },
      { "blankLine": "always", "prev": "expression", "next": "*" },
      { "blankLine": "always", "prev": "*", "next": "multiline-block-like" },
      { "blankLine": "always", "prev": "multiline-block-like", "next": "*" },
      { "blankLine": "always", "prev": "*", "next": "multiline-const" },
      { "blankLine": "always", "prev": "multiline-const", "next": "*" },
      { "blankLine": "always", "prev": "multiline-expression", "next": "*" },
      { "blankLine": "any", "prev": "expression", "next": "expression" },
      { "blankLine": "always", "prev": "*", "next": "return" },
      { "blankLine": "any", "prev": "export", "next": "export" },
    ],
  },
};
