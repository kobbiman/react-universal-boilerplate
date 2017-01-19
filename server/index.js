import Koa from 'koa'
import mount from 'koa-mount'
import serve from 'koa-static'
import views from 'koa-views'
import path from 'path'

import universalMiddleware from './util/universal'

import webpack from 'webpack'
import webpackConfig from '../webpack.config.babel.js'
import appConfig from '../config'

const app = new Koa()
const __DEV__ = process.env.NODE_ENV === 'development'

// attach template engine
const templatesDir = __DEV__ ?
  path.resolve(appConfig.compile.entry, 'templates') :
  appConfig.compile.output

app.use(views(templatesDir, { map: { html: 'nunjucks' } }))

if (__DEV__) {

  const webpackDevMiddleware = require('./util/webpack-dev').default
  const webpackHMRMiddleware = require('./util/webpack-hmr').default
  const compiler = webpack(webpackConfig)

  app.use(webpackDevMiddleware(compiler, appConfig.compile.publicPath))
  app.use(webpackHMRMiddleware(compiler))
}

// static files
app.use(mount('/static', serve(appConfig.compile.output)))

// api
app.use(mount('/api', require('./api/news')))

// universal rendering middleware
app.use(mount(universalMiddleware))

export default app
