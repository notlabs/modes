const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  require('eslint-config-prettier'),
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      'func-style': ['error', 'expression'],
      'arrow-body-style': ['error', 'as-needed'],
      'import/no-default-export': 'error',
      'prefer-arrow/prefer-arrow-functions': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
    plugins: {
      'prefer-arrow': require('eslint-plugin-prefer-arrow'),
      import: require('eslint-plugin-import'),
    },
  },
];
