var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval', //'cheap-eval-source-map',
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
      'src',
      'node_modules',
    ],
    extensions: [ '', '.json', '.js' ],
    alias:{
      'generic-redux-form': 'lib',
      'react-native': 'react-native-web-extended',
      'native-base': 'native-base-web',
      // 'alias': path.join(__dirname, 'deep/folder/alias'),
      // './assets': 'app/assets',
      'react-native-vector-icons/Ionicons': 'native-base-web/lib/Components/Widgets/Icon',
      'react/lib/ReactNativePropRegistry': 'react-native-web-extended/dist/modules/ReactNativePropRegistry'
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loaders: [ 'babel-loader'],
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'lib')],
        // exclude: [path.join(__dirname, 'node_modules')]
        // resolveLoader: { root: path.join(__dirname, "node_modules")}
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
