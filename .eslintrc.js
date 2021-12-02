module.exports = {
  env: {
    node: true,
    mocha: true,
  },
  extends: [`eslint:recommended`, `plugin:prettier/recommended`],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: `module`,
  },
  plugins: [`@typescript-eslint`, `prettier`],
  rules: {
    "prettier/prettier": `error`,
    quotes: [`warn`, `backtick`],
    "@typescript-eslint/no-unused-vars": [`error`],
  },
};
