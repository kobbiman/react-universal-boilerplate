import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ImageminPlugin from 'imagemin-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'
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
  }),
  new CopyWebpackPlugin([
    {
      from: path.join(appConfig.compile.entry, appConfig.compile.publicPath),
      to: path.join(appConfig.compile.output, appConfig.compile.publicPath),
    }
  ])
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
