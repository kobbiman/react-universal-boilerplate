import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ImageminPlugin from 'imagemin-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpackConfig from './base'
import appConfig from '../config'

webpackConfig.devtool = ''

webpackConfig.entry = {
  app: [
    'babel-polyfill',
    appConfig.compile.entry
  ],
  vendor: appConfig.compile.vendors
}

webpackConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  }),
  new webpack.optimize.CommonsChunkPlugin('vendor', appConfig.compile.jsVendorBundle),
  new ExtractTextPlugin(appConfig.compile.cssBundle, { allChunks: true }),
  new ImageminPlugin({
    pngquant: {
      quality: '95-100'
    }
  }),
  new HtmlWebpackPlugin({
    template: appConfig.compile.template,
    hash: false,
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: false
    }
  })
)

webpackConfig.module.loaders.push(
  {
    test: /\.css/,
    loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
    include: appConfig.compile.entry
  },
  {
    test: /\.scss/,
    loader: ExtractTextPlugin.extract('style', 'css!postcss'),
    include: appConfig.compile.entry
  }
)

export default webpackConfig
