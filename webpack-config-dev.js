var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './example/index.js'
  ],
  output: {
    path: path.join(__dirname, 'example/dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: [ '', '.json', '.js' ],
    alias: {
      'generic-redux-form': '../src/index.js',
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loaders: [ 'babel-loader' ],
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'example')]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        include: path.join(__dirname, '.')

      }
    ]
  }
};
