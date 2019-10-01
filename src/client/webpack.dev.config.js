const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const config = require('config');

const constants = require('../server/constants');


module.exports = {
  mode: 'development',

  entry: {
    main: [
      '@babel/polyfill',
      'react-hot-loader/patch',
      './index.jsx',
    ],
  },

  output: {
    path: `${__dirname}/static/`,
    publicPath: '/static/',
    filename: '[name].js',
  },

  context: path.resolve(__dirname, './'),

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ['lodash'],
        },
      },
      {
        test: /\.pcss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]',
              },
              localsConvention: 'camelCase',
              importLoaders: 1,
            },
          },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },

  devtool: 'source-map',

  resolve: {
    modules: ['./', 'node_modules'],
    extensions: ['.mjs', '.js', '.jsx', '.pcss'],
  },

  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      APP_CONFIG: {
        apiUrl: JSON.stringify(config.apiUrl),
        webSocketUrl: JSON.stringify(config.webSocketUrl),
        landingLoginUrl: JSON.stringify(config.landingLoginUrl),
      },
      APP_CONSTANTS: {
        ACCESS_TOKEN_COOKIE_NAME: JSON.stringify(constants.ACCESS_TOKEN_COOKIE_NAME),
      },
    }),
  ],
};
