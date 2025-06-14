import globals from 'globals';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node, 
        error: 'readonly', 
      },
      parserOptions: {
        ecmaVersion: 'latest', 
      }
    },
    rules: {
      'indent': ['error', 2],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], 
      'no-console': 'warn', 
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'indent': ['error', 2],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
    },
  },
];