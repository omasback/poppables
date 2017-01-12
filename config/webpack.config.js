// Example webpack configuration with asset fingerprinting in production.
'use strict';

var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');

// must match config.webpack.dev_server.port
var devServerPort = 3808;

// set NODE_ENV=production on the environment to add asset fingerprints
var production = process.env.NODE_ENV === 'production';

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

    filename: production ? '[name]-[chunkhash].js' : '[name].js'
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
        loader: 'url-loader?name=[path][name].[ext]&limit=8192&context=src',
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
};

if (production) {
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  );
} else {
  config.devServer = {
    port: devServerPort,
    headers: { 'Access-Control-Allow-Origin': '*' }
  };
  config.output.publicPath = '//localhost:' + devServerPort + '/webpack/';
  // Source maps
  // config.devtool = 'cheap-module-eval-source-map';
  config.devtool = 'cheap-source-map'
}

module.exports = config;
