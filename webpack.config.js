var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
    app: path.resolve(__dirname + '/example', 'index.js')
  },
  output: {
    path: path.resolve(__dirname) + '/build',
    filename: 'bundle.js', 
    publicPath:'build/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [node_modules_dir],
      loader: 'babel-loader'
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.(png|jpg|mp3|ogg)$/,
      loader: 'file-loader'
    }]
  },
  resolve: {
    modulesDirectories: ['node_modules','src']
  },
  plugins: [
  ]
};

module.exports = config;