module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  plugins: ["import",],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "linebreak-style": 0,
    "no-use-before-define": ["error", { "functions": false, }],
    "import/extensions": ["error", "always", {ignorePackages: true}],
    "max-len": [2, 120, 4, {"ignoreUrls": true}],
    "no-unused-expressions": ["error", { "allowTernary": true }],
    "no-undef": [0, { "typeof": true }],
  },
};