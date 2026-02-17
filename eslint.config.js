import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
    prettier,
    {
        files: ['**/*.ts'],
        plugins: { '@typescript-eslint': ts },
        languageOptions: {
            parser: tsParser,
            parserOptions: { project: './tsconfig.json' }
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-floating-promises': 'error'
        }
    },
    {
        files: ['**/*.svelte'],
        plugins: { svelte },
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: tsParser
            }
        },
        rules: {
            'svelte/no-unused-svelte-ignore': 'error',
            'svelte/valid-compile': 'error',
            'svelte/no-dupe-else-if-blocks': 'error',
            'svelte/no-dupe-style-properties': 'error'
        }
    },
    {
        files: ['**/*.js'],
        rules: {
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
        }
    },
    {
        ignores: [
            '.svelte-kit/**',
            'build/**',
            'node_modules/**',
            'dist/**',
            'coverage/**',
            'prisma/**'
        ]
    }
];