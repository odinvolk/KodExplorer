const path = require('path')
const webpack = require('webpack')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

const config = {
  entry: [
    './src/main'
  ],
  output: {
    path: path.join(__dirname, '..'),
    filename: 'litewrite.min.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(new RegExp('^(xmlhttprequest|./lang)$'))
  ],
  module: {
    loaders: [
      {
        test: [/\.txt$/, /\.html$/],
        loader: 'raw'
      }
    ]
  },
  resolve: {
    alias: {
      'rs-adapter': path.join(__dirname, '../lib/backbone.remoteStorage-documents'),
      snap: path.join(__dirname, '../lib/snap')
    }
  },
  cssnext: {
    browsers: 'last 2 versions'
  }
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'litewrite',
      minify: true,
      staticFileGlobs: [
        'style/litewrite.css',
        'style/*.ttf',
        'style/*.otf',
        'img/*.png',
        'img/*.svg'
      ]
    }),
    new webpack.DefinePlugin({
      'window.PRODUCTION': 'true'
    })
  )
} else {
  config.devtool = 'cheap-module-eval-source-map'
  config.entry.unshift('webpack-hot-middleware/client')
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
