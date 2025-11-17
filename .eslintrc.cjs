/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  env: {
    es2021: true,
    node: true,
  },

  extends: ["eslint:recommended", "airbnb-base", "prettier"],

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  overrides: [
    {
      env: { node: true },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: { sourceType: "script" },
    },
  ],

  rules: {
    // Allow console logs
    "no-console": "off",

    // TripleTen rules
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "import/extensions": ["error", "ignorePackages", { js: "always" }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },
};
