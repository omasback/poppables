'use strict'

var path = require('path')
var webpack = require('webpack')
var StatsPlugin = require('stats-webpack-plugin')

var phaserModule = path.join(__dirname, '../node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi = path.join(phaserModule, 'build/custom/pixi.js'),
    p2 = path.join(phaserModule, 'build/custom/p2.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// must match config.webpack.dev_server.port
var devServerPort = 3808

var production = process.env.NODE_ENV === 'production'

var namingScheme = ''
if (production) {
  namingScheme = '-[hash:6]'
}

var config = {
  entry: {
    // Sources are expected to live in $app_root/webpack
    home: './webpack/home.js',
    pages: './webpack/pages.js',
    drop: './webpack/games/drop.js',
    pops: './webpack/games/pops.js',
    toss: './webpack/games/toss.js',
  },

  output: {
    // Build assets directly in to public/webpack/, let webpack know
    // that all webpacked assets start with webpack/

    // must match config.webpack.output_dir
    path: path.join(__dirname, '..', 'public', 'webpack'),
    publicPath: '/webpack/',

    filename: '[name]' + namingScheme + '.js'
  },

  resolve: {
    root: path.join(__dirname, '..', 'webpack'),
    alias: {
      'phaser': phaser,
      'pixi.js': pixi,
      'p2': p2,
    },
    modules: path.join(__dirname, '..', 'webpack'),
  },

  plugins: [
    new ExtractTextPlugin('styles' + namingScheme + '.css'),
    // must match config.webpack.manifest_filename
    new StatsPlugin('manifest.json', {
      // We only need assetsByChunkName
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true
    }),
  ],
  module: {
    loaders: [
      { test: /pixi.js/, loader: "script" },
      { test: /\.json$/, loader: 'json' },
      {
        loader: 'babel!eslint-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!autoprefixer!sass'),
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer'),
      }, {
        test: /\.vue$/,
        loader: 'vue!eslint'
      }, {
        test: /\.(svg|gif|png|jpg|woff|woff2|wav|mp3|eot|ttf)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: '[path][name]' + namingScheme + '.[ext]',
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

if (production) {
  config.debug = false
  config.cache = false
  config.bail = true
  config.devtools = '#cheap-module-source-map'
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: { warnings: false },
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, '..', 'webpack' , '570597'),
      to: '570597'
    }])
  )
} else {
  config.output.publicPath = '//localhost:' + devServerPort + '/webpack/'
  // config.devtool = 'cheap-module-eval-source-map'
  config.devtool = 'eval'
  config.devServer = {
    port: devServerPort,
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') }
    })
  )
}

module.exports = config
