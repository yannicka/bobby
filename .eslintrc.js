module.exports = {
  env: {
    browser: true,
    es6: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },

  plugins: [
    '@typescript-eslint',
  ],

  root: true,

  rules: {
    'semi': ['error', 'never'],

    'no-irregular-whitespace': 'off',

    'no-unused-vars': 'off',

    'comma-dangle': ['error', 'always-multiline'],

    'no-trailing-spaces': ['error', {
      'ignoreComments': true,
    }],

    'prefer-template': 'error',

    'quotes': ['error', 'single'],

    'no-multiple-empty-lines': ['error'],

    '@typescript-eslint/indent': ['error', 2],

    '@typescript-eslint/no-unsafe-return': 'off',

    '@typescript-eslint/no-floating-promises': 'off',

    '@typescript-eslint/no-unused-vars': ['error', {
      'varsIgnorePattern': '^_',
      'argsIgnorePattern': '^_',
    }],

    '@typescript-eslint/member-delimiter-style': ['error', {
      'singleline': {
        'delimiter': 'comma',
      },
      'multiline': {
        'delimiter': 'none',
      }
    }],

    '@typescript-eslint/no-inferrable-types': 'off',

    '@typescript-eslint/no-use-before-define': 'off',

    '@typescript-eslint/unbound-method': 'off',

    '@typescript-eslint/no-namespace': 'off',
  },
}
