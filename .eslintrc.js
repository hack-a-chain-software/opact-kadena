/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

// eslint-disable-next-line
const { resolve } = require('path');

module.exports = {
  root: true,

  extends: [
    'airbnb-base',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-prettier',
  ],

  env: {
    browser: true,
    node: true,
    es6: true,
  },

  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
  },

  parser: 'vue-eslint-parser',
  plugins: ['import', 'unused-imports'],

  overrides: [
    {
      files: ['./front/**/*.ts'],
      plugins: ['@typescript-eslint'],
      extends: [
        '@vue/typescript/recommended',
        '@vue/eslint-config-typescript/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: ['./front/*/tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-unused-vars': 0,
      },
    },
  ],

  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'no-unused-vars': 0,
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 0,
    'class-methods-use-this': 0,
    'no-console': 0,
    'no-await-in-loop': 0,
    'no-underscore-dangle': 0,
    'no-bitwise': 0,
    'no-plusplus': 0,
    'no-nested-ternary': 0,
    'no-restricted-syntax': 0,
    'no-restricted-properties': 0,
    'consistent-return': 0,
    'no-param-reassign': 0,
    'import/no-cycle': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
  },

  settings: {
    'import/resolver': {
      typescript: {
        project: ['./front/*/tsconfig.json'],
      },
      alias: {
        map: [
          ['@front', resolve(__dirname, './contracts')],
          ['@contract', resolve(__dirname, './front')],
        ],
      },
      node: {
        extensions: ['.vue', '.ts'],
      },
    },
  },
};
