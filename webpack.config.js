/* eslint-disable */
// @ts-nocheck
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'production',
  entry: './index.ts',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: ASSET_PATH,
    filename: 'messenger.[contenthash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
    new MiniCssExtractPlugin({
      filename: 'messenger.[contenthash].css',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
      components: path.resolve(__dirname, 'src/components'),
      core: path.resolve(__dirname, 'src/core'),
      pages: path.resolve(__dirname, 'src/pages'),
      types: path.resolve(__dirname, 'src/types'),
      utils: path.resolve(__dirname, 'src/utils'),
      modules: path.resolve(__dirname, 'src/modules'),
      store: path.resolve(__dirname, 'src/store'),
      services: path.resolve(__dirname, 'src/services'),
      api: path.resolve(__dirname, 'src/api'),
    },
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      }
    ],
  },
};
