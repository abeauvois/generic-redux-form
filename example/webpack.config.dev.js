var fs = require('fs');
var path = require('path');
var webpack = require('webpack');


var genericReduxFormPath = fs.realpathSync(
  path.resolve(__dirname, 'node_modules/generic-redux-form/src') // node_modules/generic-redux-form = SymLink
);

module.exports = {
  devtool: 'eval', //'cheap-eval-source-map', //'eval',
  entry: [
    'babel-polyfill',
    // 'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true',
    './src/app.js'
  ],
  // output: {
  //   path: path.join(__dirname, 'dist'),
  //   filename: 'bundle.js',
  //   publicPath: '/dist/'
  // },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    // chunkFilename: '[id].chunk.js',
    publicPath: '/dist/'
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('main.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('development') //JSON.stringify('development')
    // })
  ],
  resolve: {
    root: path.resolve(__dirname, 'node_modules'),
    modulesDirectories: ['src','node_modules',],
    extensions: [ '', '.json', '.js' ],
    alias:{
      'generic-redux-form': genericReduxFormPath,
      'react-native': 'react-native-web-extended',
      'native-base': 'native-base-web',
      'react-native-vector-icons/Ionicons': 'native-base-web/lib/Components/Widgets/Icon',
      'react/lib/ReactNativePropRegistry': 'react-native-web-extended/dist/modules/ReactNativePropRegistry'
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loaders: [ 'babel-loader'],
        include: [path.join(__dirname, 'src'), genericReduxFormPath],
        // exclude: [path.join(__dirname, 'node_modules')]
        // resolveLoader: { root: path.join(__dirname, "node_modules")}
      },
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader'
      // }
    ]
  }
};
