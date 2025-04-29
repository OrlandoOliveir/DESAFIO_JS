const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single',
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      fix: true,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html', // usa seu HTML base
      inject: 'body', // injeta scripts antes do </body>
    }),
  ],
  mode: 'production',
  devtool: 'source-map',
};
