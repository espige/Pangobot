module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'standard',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:promise/recommended',
        'prettier',
    ],
    parserOptions: {
        ecmaVersion: 2015,
        sourceType: 'module',
    },
    plugins: ['prettier', '@typescript-eslint'],
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                ts: 'never',
            },
        ],
        'no-empty-pattern': ['off'],
        'no-undef': ['error'],
        'no-unused-vars': ['off'],
        'no-var': ['error'],
        'object-curly-spacing': ['error', 'always'],
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: true,
                tabWidth: 4,
            },
        ],
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/no-var-requires': ['off'],
    },
    env: {
        // change as necessary
        node: true,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts'],
            },
        },
    },
};
