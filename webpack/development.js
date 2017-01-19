import webpack from 'webpack'
import webpackConfig from './base'
import appConfig from '../config'

webpackConfig.postcss.push(
  require('postcss-browser-reporter')({}),
  require('postcss-reporter')({})
)

webpackConfig.entry = [
  'babel-polyfill',
  'react-hot-loader/patch',
  'webpack-hot-middleware/client',
  appConfig.compile.entry
]

webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
)

webpackConfig.module.loaders.push(
  {
    test: /\.css/,
    loaders: [ 'style', 'css', 'postcss' ],
    include: appConfig.compile.entry
  },
  {
    test: /\.scss/,
    loaders: [ 'style', 'css', 'sass', 'postcss' ],
    include: appConfig.compile.entry
  }
)

export default webpackConfig
