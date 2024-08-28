module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: "module"
  },
  extends: [
    "next/core-web-vitals",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
   plugins: ["@typescript-eslint"],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    // JavaScript rules
    "prefer-const": "warn",
    "no-var": "warn",
    "no-unused-vars": "warn",
    "object-shorthand": "warn",
    "quote-props": ["warn", "as-needed"],
    eqeqeq: ["warn", "always"],
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"]
      }
    ],
    "lines-between-class-members": [
      "error",
      "always",
      {
        exceptAfterSingleLine: true
      }
    ],
    "no-else-return": "error",
    "no-implicit-coercion": "error",
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: ["state"]
      }
    ],
    // TypeScript rules
    "@typescript-eslint/array-type": [
      "warn",
      {
        default: "array"
      }
    ],
    "@typescript-eslint/consistent-type-assertions": [
      "warn",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "never"
      }
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true
      }
    ],
    "@typescript-eslint/no-explicit-any": ["error"],
    // React rules
    "react/jsx-fragments": ["warn", "syntax"],
    "react/jsx-filename-extension": [
      "warn",
      {
        extensions: ["ts", "tsx"]
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",

    "react/jsx-curly-brace-presence": [
      "error",
      {
        props: "never",
        children: "never"
      }
    ],
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true
      }
    ],
    "react/display-name": "off",
    // Import rules
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never"
      }
    ],
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before"
          }
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        }
      }
    ],
    "import/no-named-as-default": 0,
    "no-duplicate-imports": "error"
  }
}
