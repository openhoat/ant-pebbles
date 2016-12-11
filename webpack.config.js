const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: ['./src/main.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js',
    publicPath: '/dist/',
  },
  module: {
    loaders: [
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      /*{
       include: path.resolve(__dirname, 'node_modules/pixi.js'),
       loader: 'transform-loader/cacheable?browserify-versionify'
       },*/
    ],
    /*postLoaders: [
      {
        include: path.resolve(__dirname, 'node_modules/pixi.js'),
        loader: 'ify'
      }
    ]*/
  },
  vue: {
    loaders: {
      js: 'babel',
    },
  },
  plugins: [
    new webpack.ProvidePlugin({_: 'lodash'}),
  ],
  resolve: {
    alias: {
      //'pixi': 'pixi.js/lib/index.js',
    },
  },
  devtool: '#inline-source-map',
  devServer: {inline: true},
}
