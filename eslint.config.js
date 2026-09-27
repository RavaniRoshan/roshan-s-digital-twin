import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    // Registry-generated code (installed via `shadcn add @spaceui/...`).
    // Not hand-authored, and re-running the CLI would revert local edits,
    // so vendored-only rules are relaxed here rather than patched in place.
    files: [
      "src/components/spaceui/**",
      "src/components/orb/**",
      "src/components/ui/**",
      "src/lib/**",
      "src/utils/**",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
);
