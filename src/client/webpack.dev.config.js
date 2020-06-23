const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');


module.exports = {
  mode: 'development',

  entry: {
    main: [
      'react-hot-loader/patch',
      './index.jsx',
    ],
  },

  output: {
    path: `${__dirname}/static/`,
    publicPath: '/static/',
    filename: 'main.js',
  },

  context: path.resolve(__dirname, './'),

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            ['react-css-modules', {
              generateScopedName: '[name]__[local]_[hash:8]',
            }],
          ],
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
      {
        test: /\.pcss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localsConvention: 'camelCase',
              modules: {
                localIdentName: '[name]__[local]_[hash:8]',
              },
            },
          },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[contenthash].[ext]',
            },
          },
        ],
      },
    ],
  },

  devtool: 'source-map',

  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' },
    modules: ['./', 'node_modules'],
    extensions: ['.mjs', '.js', '.jsx', '.pcss'],
  },

  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
