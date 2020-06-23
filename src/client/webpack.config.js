const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const generateScopedName = require('./generateScopedName');


// for Sentry.io and similar tools set to true
const BUILD_SOURCE_MAP = false;

module.exports = {
  mode: 'production',

  entry: {
    main: ['@babel/polyfill', './index.jsx'],
  },

  output: {
    path: `${__dirname}/static/`,
    publicPath: '/static/',
    // Unfortunately Webpack have issues with contenthash currently
    // It changes on repeated builds even if content not changed
    // https://github.com/webpack/webpack/issues/9520
    // anyway it is still very useful for long term caching
    filename: 'main.[contenthash].js',
    chunkFilename: 'main.[id].[contenthash].js',
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
            'lodash',
            [
              'react-css-modules',
              {
                generateScopedName,
                webpackHotModuleReloading: false,
              },
            ],
          ],
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
      {
        test: /\.pcss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]_[hash:base64:5]',
                getLocalIdent: ({ resourcePath }, localIdentName, localName) => {
                  return generateScopedName(localName, resourcePath);
                },
              },
              localsConvention: 'camelCase',
            },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]_[hash:base64:5]',
                getLocalIdent: ({ resourcePath }, localIdentName, localName) => {
                  return generateScopedName(localName, resourcePath);
                },
              },
              localsConvention: 'camelCase',
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

  devtool: BUILD_SOURCE_MAP && 'hidden-source-map',

  resolve: {
    modules: ['./', 'node_modules'],
    extensions: ['.mjs', '.js', '.jsx', '.pcss'],
  },

  optimization: {
    minimize: true,
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  stats: {
    children: false,
    chunks: true,
    chunkModules: false,
    colors: true,
    entrypoints: false,
    env: true,
    errors: true,
    errorDetails: true,
    publicPath: true,
    performance: false,
    modules: false,
    timings: true,
    warnings: true,
  },

  performance: {
    hints: false,
  },

  plugins: [
    new LodashModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css',
      chunkFilename: 'main.[id].[contenthash].css',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BABEL_ENV: JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'views/index-template.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};
