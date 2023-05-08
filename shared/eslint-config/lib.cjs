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
  ignorePatterns: ['dist/*', '.eslintrc.js', '.eslintrc.cjs'],
  rules: {
    'no-console': 'warn',
    'no-var': 'error',
    'no-param-reassign': 'error',
    'prefer-const': 'error',
    'max-lines-per-function': [
      'error',
      { max: 85, skipBlankLines: true, skipComments: true },
    ],
  },
};
