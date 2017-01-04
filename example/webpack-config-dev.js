var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval', //'cheap-eval-source-map', //'eval',
  'display-error-details': true,
  entry: [
    'babel-polyfill',
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    modulesDirectories: [
      '/Users/entropicsynergies/Documents/generic-redux-form/src',
      'src',
      'node_modules',
    ],
    extensions: [ '', '.json', '.js' ],
    alias:{
      'generic-redux-form': '/Users/entropicsynergies/Documents/generic-redux-form/src'
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loaders: [ 'babel-loader'],
        include: [path.join(__dirname, 'src'), '/Users/entropicsynergies/Documents/generic-redux-form/src']//path.join(__dirname, 'node_modules/generic-redux-form/src')],
        // resolveLoader: { root: path.join(__dirname, "node_modules")}
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
