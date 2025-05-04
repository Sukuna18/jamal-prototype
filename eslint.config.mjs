import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import eslintConfigPrettier from "eslint-config-prettier"; // Import prettier config

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"), // Keep Next.js core rules
  ...tseslint.configs.recommended, // Add recommended TypeScript rules
  {
    // React specific settings
    ...reactRecommended,
    ...reactJsxRuntime,
    files: ["**/*.{js,jsx,ts,tsx}"],
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    languageOptions: {
      ...reactRecommended.languageOptions,
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    // Custom rules configuration
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Ensure unused variables are flagged (error for TS, warn for JS)
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-unused-vars": "off", // Disable base rule as TS rule handles it

      // Disable the unescaped entities rule globally
      "react/no-unescaped-entities": "off",

      // Add any other specific rules you want here
      // e.g., "react/prop-types": "off" // If using TypeScript, prop-types are often redundant
    },
  },
  eslintConfigPrettier, // Add prettier config LAST to override other formatting rules
  {
    // Ignore specific files or directories if needed
    ignores: [".next/", "node_modules/", "public/", "*.json", "*.md", "*.yaml"], // Ignore config/data files
  },
];

export default eslintConfig;
