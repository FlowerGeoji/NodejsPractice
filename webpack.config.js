const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const srcDir = path.resolve(__dirname, 'src');

module.exports = (env) => ({
  mode: 'development',
  target: 'node',

  entry: ['babel-polyfill', './src/www.js'],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new Dotenv({
      path: './.env.' + (env || 'dev'),
    })
  ],
})
