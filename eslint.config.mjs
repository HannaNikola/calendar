
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next", "next/typescript"),
  {
    rules: {
      //  allow any
      "@typescript-eslint/no-explicit-any": "off",

      //  allow @ts-ignore
      "@typescript-eslint/ban-ts-comment": "off",

      //  warning instead of error
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-unused-expressions": "warn",
      "@next/next/no-assign-module-variable": "warn",

      //  consoles allow
      "no-console": "off"
    }
  }
];
