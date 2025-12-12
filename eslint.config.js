// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.all,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...angular.configs.tsAll,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'no-console': 'off',
      'id-length': 'off',
      'one-var': 'off',
      'no-ternary': 'off',
      'no-undefined': 'off',
      'no-magic-numbers': 'off',
      'sort-keys': 'off',
      'sort-imports': 'off',
      'max-statements': 'off',
      'max-params': 'off',
      'no-param-reassign': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@angular-eslint/component-class-suffix': 'off',
      '@angular-eslint/use-injectable-provided-in': 'off',
      'no-else-return': 'off',
      // False positive in .spec.ts.
      'init-declarations': 'off',
      // False position with decorators.
      'new-cap': 'off',
      // Service shouldn't have static methods.
      'class-methods-use-this': 'off',
      // False positive.
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      // False positive.
      '@typescript-eslint/restrict-template-expressions': 'off',
      'capitalized-comments': 'off',
      '@angular-eslint/directive-class-suffix': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@angular-eslint/no-forward-ref': 'off',
      'no-continue': 'off',
      'func-style': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      'max-lines-per-function': 'off',
      complexity: 'off',
      'max-depth': 'off',
      'max-lines': 'off',
      'no-labels': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      ...angular.configs.templateAll,
    ],
    rules: {
      '@angular-eslint/template/attributes-order': [
        'error',
        {
          alphabetical: true,
        },
      ],
      '@angular-eslint/template/i18n': 'off',
      '@angular-eslint/template/no-call-expression': 'off',
    },
  }
);
