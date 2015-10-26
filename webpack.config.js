var Extract = require('extract-text-webpack-plugin');
var Webpack = require('webpack');
var path = require('path');

var webpackConfig = {
  watch: false,
  devtool: 'sourcemap',
  entry: './src/app.dev.js',

  output: {
    filename: 'app.js',
    path: path.resolve('./dist/dev/')
  },

  module: {
    loaders: [
      { test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },

  resolveLoader: {
    modulesDirectories: [
      path.resolve('./node_modules')
    ]
  },

  resolve: {
    alias: {
      "utils": path.resolve('./src/utils'),
      "dialogue": path.resolve('./src/dialogue'),
    }
  },

  plugins: [
    //new Extract('styles.css', {allChunks: true})
  ],

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true
  }

};

module.exports = webpackConfig;
