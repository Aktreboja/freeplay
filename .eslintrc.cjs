/* eslint-env node */
import '@rushstack/eslint-patch/modern-module-resolution';

export default {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  overrides: [
    {
      files: [
        '**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'
      ],
      extends: [
        'plugin:cypress/recommended'
      ],
    },
    {
      files: [
        'server/**/*.{js,ts}', // Adjust the path according to your backend directory structure
      ],
      env: {
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:node/recommended', // Use recommended rules for Node.js
        'plugin:@typescript-eslint/recommended', // Recommended rules from the @typescript-eslint/eslint-plugin
        'prettier' // Integrate Prettier for code formatting
      ],
      parserOptions: {
        ecmaVersion: 2020, // Support modern ECMAScript features
        sourceType: 'module',
      },
      rules: {
        // Add any specific rules for your backend code here
      },
    },
    {
      files: [
        '*.config.js', // Add any other configuration files if needed
        '*.config.ts',
      ],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
