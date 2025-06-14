const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    new_task: './src/new_task.js',
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
optimization: {
  splitChunks: {
    chunks: 'all',
    minSize: 10000, 
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/, 
        name: 'vendors',
        priority: 10, 
        enforce: true,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js'],
      fix: true,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
      chunks: ['main', 'vendors', 'runtime'],
    }),
    new HtmlWebpackPlugin({
      template: './public/new_task.html',
      filename: 'new_task.html',
      inject: 'body',
      chunks: ['new_task', 'vendors', 'runtime'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: '.',
          globOptions: {
            ignore: ['**/*.html'],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
  ],
  mode: 'production',
  devtool: 'source-map',
};