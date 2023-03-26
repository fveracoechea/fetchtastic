// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  ignorePatterns: ['dist/*', '.eslintrc.js'],
  rules: {
    'max-lines-per-function': [
      'error',
      { max: 50, skipBlankLines: true, skipComments: true },
    ],
  },
};
