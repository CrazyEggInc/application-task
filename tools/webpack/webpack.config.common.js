const { resolve } = require('path');
const webpack = require('webpack'); // to access built-in plugins
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    'app': resolve(__dirname, '..', '..', 'src', 'main.ts'),
  },
  output: {
    path: resolve(__dirname, '..', '..', 'dist'),
    filename: process.env.NODE_ENV === 'production' ? '[name].[hash].js' : '[name].js'
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin
    ],
    modules: ['.', 'node_modules'],
    extensions: ['.ts', '.js'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.svg$/,
        loader: 'url-loader'
      },
      {
        test   : /\.(png|ttf|eot|otf|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : 'file-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
              // reloadAll: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({ path: resolve(__dirname, '..', '..', '.env') }),
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'production' ? '[name].[hash].css' : '[name].css',
      chunkFilename: process.env.NODE_ENV === 'production' ? '[id].[hash].css' : '[id].css',
    })
  ],
};
