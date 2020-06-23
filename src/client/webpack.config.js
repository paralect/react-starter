const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

// for Sentry.io and similar tools set to true
const BUILD_SOURCE_MAP = false;

module.exports = {
  mode: 'production',

  entry: {
    main: ['./index.jsx'],
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
            ['react-css-modules', {
              generateScopedName: '[hash:8]',
            }],
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
              localsConvention: 'camelCase',
              modules: {
                localIdentName: '[hash:8]',
              },
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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

  devtool: BUILD_SOURCE_MAP && 'hidden-source-map',

  resolve: {
    modules: ['./', 'node_modules'],
    extensions: ['.mjs', '.js', '.jsx'],
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
