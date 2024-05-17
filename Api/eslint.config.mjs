import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  // Agrega Prettier a la configuración
  {
    plugins: [pluginPrettier],
    extends: [configPrettier],
    rules: {
      "prettier/prettier": "error",
    },
  },
];