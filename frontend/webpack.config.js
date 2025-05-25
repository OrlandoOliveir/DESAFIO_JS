const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    new_task: './src/new_task.js' // Adicionei esta entrada
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      }
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js'],
      fix: true,
    }),
    // Index.html
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
      chunks: ['main'] // Injeta apenas o JS principal
    }),
    // New_task.html
    new HtmlWebpackPlugin({
      template: './public/new_task.html',
      filename: 'new_task.html',
      inject: 'body',
      chunks: ['new_task'] // Injeta apenas o JS da nova tarefa
    }),
    // Copia arquivos estáticos (CSS, etc)
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: '.',
          globOptions: {
            ignore: ['**/*.html'] // Ignora todos HTMLs (já processados)
          }
        }
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
  ],
  mode: 'production',
  devtool: 'source-map',
};