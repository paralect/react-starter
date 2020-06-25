module.exports = {
  extends: ['airbnb', 'airbnb/hooks'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  env: {
    browser: true,
    mocha: true,
    es6: true,
    node: true,
  },
  plugins: [
    'react',
  ],
  rules: {
    'arrow-body-style': 0,
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['**/*.config.js'],
    }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
        moduleDirectory: [
          'src',
          'node_modules',
          'server',
        ],
        paths: ['src/client'],
      },
    },
  },
};
