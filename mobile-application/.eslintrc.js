module.exports = {
  extends: '@extrahorizon/eslint-config-react',
  ignorePatterns: [
    '/dist/*',
    '.eslintrc.js',
    'tailwind.config.js',
    'nativewind-env.d.ts'
  ],
  rules: {
    "linebreak-style": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "block-scoped-var": 1,
    "import/no-extraneous-dependencies": "off",
  }
};