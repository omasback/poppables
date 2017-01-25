'use strict'

var path = require('path')
var webpack = require('webpack')
var StatsPlugin = require('stats-webpack-plugin')

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
    games: './webpack/games.js',
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
    root: path.join(__dirname, '..', 'webpack')
  },

  plugins: [
    // must match config.webpack.manifest_filename
    new StatsPlugin('manifest.json', {
      // We only need assetsByChunkName
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
    })
  ],
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      {
        loader: 'babel',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      }, {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer!sass',
      }, {
        test: /\.css$/,
        loader: 'style!css!autoprefixer',
      }, {
        test: /\.vue$/,
        loader: 'vue',
      }, {
        test: /\.(svg|gif|png|jpg|woff|woff2|eot|ttf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          name: '[path][name]' + namingScheme + '.[ext]',
          limit: '8192',
          context: 'src',
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
    new webpack.optimize.OccurenceOrderPlugin()
  )
} else {
  config.output.publicPath = '//localhost:' + devServerPort + '/webpack/'
  config.devtool = 'cheap-module-eval-source-map'
  // config.devtool = 'cheap-source-map'
  config.devServer = {
    port: devServerPort,
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
}

module.exports = config
