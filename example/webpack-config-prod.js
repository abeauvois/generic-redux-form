var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // context: path.join(__dirname, '..'),
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, 'src/lib'), to: path.join(__dirname, '../src'), //flatten: true
    }], {debug: 'info'}
  ),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: [ '', '.json', '.js' ],
    alias:{
      'generic-redux-form': 'generic-redux-form/src'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel-loader' ],
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules/generic-redux-form/src')]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.md/,
        loaders: [ "html-loader", "markdown-loader" ]
      }
    ]
  }
};
