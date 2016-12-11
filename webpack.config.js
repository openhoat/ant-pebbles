const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: ['./src/main.js'],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'main.js',
    publicPath: '/build/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
    }],
  },
  vue: {
    loaders: {
      js: 'babel',
    },
  },
  plugins: [
    new webpack.ProvidePlugin({_: 'lodash'}),
  ],
  //devtool: '#inline-source-map',
  //devServer: {inline: true},
}
