const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

// const srcDir = path.resolve(__dirname, 'src');

module.exports = (env) => {
  return {
    mode: env,
    target: 'node',
  
    entry: './src/www.ts',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      globalObject: `(typeof self !== 'undefined' ? self : this)`,
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },

    module: {
      rules: [
        {
          test: /\.(ts)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        }
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
      }),
      new Dotenv({
        path: './.env',
      })
    ],
  }
}
