import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // Global ignores
  {
    ignores: [
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      '.playwright/**',
      'dist/**',
    ],
  },

  // Base JS rules
  eslint.configs.recommended,

  // TypeScript - strict for page objects, helpers, fixtures
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,

  // Global TypeScript options
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // TypeScript-specific
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-floating-promises': 'error', // critical in Playwright!
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/require-await': 'error',

      // General quality
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  // Playwright rules for test files
  {
    ...playwright.configs['flat/recommended'],
    files: ['**/*.spec.ts', '**/*.test.ts', '**/tests/**/*.ts'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/expect-expect': [
        'error',
        {
          assertFunctionNames: ['expectErrorState'],
        },
      ],
      'playwright/no-skipped-test': 'warn',
      'playwright/no-focused-test': 'error', // blocks accidental .only
      'playwright/no-wait-for-timeout': 'warn',
      'playwright/no-networkidle': 'warn',
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/no-standalone-expect': 'error',

      // Relaxed rules for test files
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },

  // Relaxed rules for fixtures and helpers
  {
    files: ['**/fixtures/**/*.ts', '**/helpers/**/*.ts', '**/utils/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]);
