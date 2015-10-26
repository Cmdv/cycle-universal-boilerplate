var Extract = require('extract-text-webpack-plugin');
var Webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var webpackConfig = {
  entry: './src/server.js',

  target: 'node',

  output: {
    filename: 'server.js',
    path: path.resolve('./dist/')
  },

  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/}
    ]
  },

  externals: nodeModules,

  resolve: {
    alias: {
      "utils": path.resolve('./src/utils'),
      "dialogue": path.resolve('./src/dialogue'),
    }
  },

  plugins: [
    new Extract('styles.css', {allChunks: true})
    //new Webpack.NormalModuleReplacementPlugin(/\.styl$/, 'node-noop'),
    //new Webpack.IgnorePlugin(/\.styl$/),
  ],

};

module.exports = webpackConfig;
