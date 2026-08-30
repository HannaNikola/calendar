import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";

export default defineConfig([
  ...nextVitals,

  ...tseslint.configs.recommended,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

  {
    rules: {
      // allow any
      "@typescript-eslint/no-explicit-any": "off",

      // allow @ts-ignore
      "@typescript-eslint/ban-ts-comment": "off",

      // warning instead of error
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],

      "@typescript-eslint/no-unused-expressions": "warn",

      "@next/next/no-assign-module-variable": "warn",

      // allow console
      "no-console": "off",
    },
  },
]);
