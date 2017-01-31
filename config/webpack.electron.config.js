'use strict'

var path = require('path')
var webpack = require('webpack')

var phaserModule = path.join(__dirname, '../node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi = path.join(phaserModule, 'build/custom/pixi.js'),
    p2 = path.join(phaserModule, 'build/custom/p2.js')

var config = {
  entry: {
    games: './webpack/games/pops.js',
  },

  output: {
    path: path.join(__dirname, '..', 'electron', 'assets'),
    publicPath: './assets/',

    filename: '[name].js'
  },

  resolve: {
    root: path.join(__dirname, '..', 'webpack'),
    alias: {
      'phaser': phaser,
      'pixi.js': pixi,
      'p2': p2,
    }
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        ELECTRON: JSON.stringify(true),
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ],

  module: {
    loaders: [
      { test: /pixi.js/, loader: 'script' },
      { test: /\.json$/, loader: 'json' },
      {
        loader: 'babel!eslint-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer!sass',
      }, {
        test: /\.css$/,
        loader: 'style!css!autoprefixer',
      }, {
        test: /\.vue$/,
        loader: 'vue!eslint'
      }, {
        test: /\.(svg|gif|png|jpg|woff|woff2|eot|ttf)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: '[path][name].[ext]',
        }
      },
      {
        test: /node_modules/,
        loader: 'ify'
      },
    ],
  },
  vue: {
    loaders: {
      js: 'babel',
      css: 'css!autoprefixer!sass',
      scss: 'style!css!autoprefixer!sass',
    },
  }
}

config.debug = false
config.cache = false
config.bail = true
config.devtool = 'source-map'

module.exports = config
