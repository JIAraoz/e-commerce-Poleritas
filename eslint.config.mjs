import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";

export default [
  {
    languageOptions: { globals: globals.browser },
    extends: [
      'plugin:prettier/recommended', // Usa las recomendaciones de configuración de Prettier
      // 'prettier/react', // Desactiva las reglas de ESLint que pueden entrar en conflicto con el formato de Prettier para React
    ],
    settings: {
      react: {
        version: 'detect', // Detecta automáticamente la versión de React
      },
    },
    files: ["**/*.js", "**/*.jsx"],
    reportUnusedDisableDirectives: true,
    maxWarnings: 0
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
];