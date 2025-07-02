import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: ["dist/"],
  },
  pluginJs.configs.recommended,
  // React specific config
  {
      ...pluginReactConfig,
      files: ["src/**/*.{js,jsx}"],
      languageOptions: {
          ...pluginReactConfig.languageOptions,
          globals: {
              ...globals.browser
          }
      },
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
          ...pluginReactConfig.rules,
          "react/react-in-jsx-scope": "off",
          "react/prop-types": "off"
      }
  },
  // Plugins for hooks and refresh
  {
    files: ["src/**/*.{js,jsx}"],
    plugins: {
        "react-hooks": pluginReactHooks,
        "react-refresh": pluginReactRefresh
    },
    rules: {
        ...pluginReactHooks.configs.recommended.rules,
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    }
  },
];
