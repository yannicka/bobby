module.exports = {
  env: {
    browser: true,
    es6: true,
  },

  extends: [
    'eslint:recommended',
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  plugins: [
    '@typescript-eslint',
  ],

  rules: {
    'semi': ['error', 'never'],
    'no-irregular-whitespace': 'off',
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }]
  },
}
