module.exports = {
  "root": true,
  "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "plugin:prettier/recommended",
      "plugin:security/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
  },
  "ignorePatterns": [
      "public/",
      "node_modules/",
      "./package.json",
      "./package-lock.json"
  ],
  "plugins": [
      "@typescript-eslint",
      "import",
      "security",
      "node"
  ],
  "settings": {
      "import/resolver": {
          "node": {
              "extensions": [".js", ".ts"],
              "moduleDirectory": ["node_modules", "src/"]
          }
      }
  },
  "rules": {
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "security/detect-object-injection": "warn",
      "no-empty": "off",
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-useless-escape": "off",
      "no-duplicate-imports": "error",
      "prefer-const": "off",
      "eqeqeq": "warn",
      "no-throw-literal": "warn",
      "no-undef": "off",
      "curly": "warn",
      "no-extra-boolean-cast": ["warn"],
      "prettier/prettier": ["error", { "endOfLine": "auto"} ],
      "import/order": [
          "warn",
          {
              "groups": [
                  "builtin",
                  "external",
                  "internal"
              ],
              "pathGroupsExcludedImportTypes": [
                  "builtin"
              ],
              "newlines-between": "always",
              "alphabetize": {
                  "order": "asc",
                  "caseInsensitive": true
              }
          }
      ]
  }
}