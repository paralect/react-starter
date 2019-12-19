const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

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
      {
        test: /\.css$/,
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
        ],
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2|ttf|eot|ico)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['url-loader?limit=5000&name=[name].[hash].[ext]?'],
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
      APP_CONSTANTS: {
        ACCESS_TOKEN_COOKIE_NAME: JSON.stringify(constants.ACCESS_TOKEN_COOKIE_NAME),
      },
    }),
  ],
};
