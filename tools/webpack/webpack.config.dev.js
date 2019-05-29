const { join } = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.config.common');

const config = merge(
  commonConfig,
  {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        isDevelopment: true,
        isTesting: false,
        isProduction: false
      }),
      new HtmlWebpackPlugin({
        title: 'CrazyEgg PWA',
        chunks: ['app'],
        template: join(__dirname, '..', '..', 'public', 'index.html'),
      }),
    ],
    devServer: {
      hot: true
    },
  }
);

module.exports = config;
