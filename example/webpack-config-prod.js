var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
// var nodeExternals = require('webpack-node-externals');

var genericReduxFormPath = fs.realpathSync(
  path.resolve(__dirname, 'node_modules/generic-redux-form/src') // node_modules/generic-redux-form = SymLink
);
// var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    './src/app.js'
  ],


  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: 'dist'
  },
  // externals: [nodeExternals({
  //   whitelist: ['react-native-web-extended']
  // })],
  plugins: [
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // new CopyWebpackPlugin([{
    //   from: path.join(__dirname, 'src/lib'), to: path.join(__dirname, '../../src'), //flatten: true
    // }], {debug: 'info'}
    // ),
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     warnings: false
    //   }
    // })
  ],
  resolve: {
    root: path.resolve(__dirname, 'node_modules'),
    modulesDirectories: ['src','node_modules'],
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
        // include: [path.join(__dirname, 'src'), path.join(__dirname, 'lib')],
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
