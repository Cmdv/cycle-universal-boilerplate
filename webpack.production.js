var Webpack = require('webpack');
var path = require('path');

var webpackConfig = {

  entry: './src/app.js',

  output: {
    filename: 'app.js',
    path: path.resolve('./dist/')
  },

  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/},
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
    new Extract('styles.css', {allChunks: true})
  ],

};

module.exports = webpackConfig;
