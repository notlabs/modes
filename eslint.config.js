const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  require('eslint-config-prettier'),
  {
    ignores: ['**/dist', '**/generated'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      // TODO: re-enable
      // '@nx/enforce-module-boundaries': [
      //   'error',
      //   {
      //     enforceBuildableLibDependency: true,
      //     allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js'],
      //     depConstraints: [
      //       {
      //         sourceTag: '*',
      //         onlyDependOnLibsWithTags: ['*'],
      //       },
      //     ],
      //   },
      // ],
      '@nx/enforce-module-boundaries': 'off',
      'func-style': ['error', 'expression'],
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow/prefer-arrow-functions': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      // 'unused-imports/no-unused-imports': 'error',
    },
    plugins: {
      'prefer-arrow': require('eslint-plugin-prefer-arrow'),
      import: require('eslint-plugin-import'),
      // 'unused-imports': require('eslint-plugin-unused-imports'),
    },
  },
  {
    files: ['**/src/*.tsx', '**/src/*.ts'],
    rules: {
      'import/no-default-export': 'error',
    },
  },
  {
    files: ['**/*.stories.tsx', '**/*.stories.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
];
