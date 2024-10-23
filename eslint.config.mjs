import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    files: ["./webpack.config.mjs"],
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
    }
  }
];
