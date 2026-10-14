import expoConfig from 'eslint-config-expo/flat.js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const mobileFiles = ['apps/mobile/**/*.{js,jsx,ts,tsx}'];
const serverFiles = ['apps/api/**/*.ts', 'packages/shared/**/*.ts'];

const mobileConfig = expoConfig.map((config) => ({
  ...config,
  files: mobileFiles,
}));

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.expo/**',
      'apps/api/src/generated/**',
    ],
  },
  ...mobileConfig,
  {
    files: mobileFiles,
    settings: {
      'import/resolver': {
        typescript: {
          project: 'apps/mobile/tsconfig.json',
        },
      },
    },
  },
  {
    files: [
      'apps/mobile/babel.config.js',
      'apps/mobile/metro.config.js',
      'apps/mobile/tailwind.config.js',
    ],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: serverFiles,
    languageOptions: {
      ...config.languageOptions,
      globals: globals.node,
    },
  })),
];
