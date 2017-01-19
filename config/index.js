const path = require('path')
const env = process.env.NODE_ENV || 'development'
const __DEV__ = env === 'development'

const config = {
  env: env,
  compile: {
    entry: path.resolve(__dirname, '../src'),
    output: path.resolve(__dirname, '../dist'),
    publicPath: __DEV__ ? '/static' : '/',
    jsBundle: __DEV__ ? 'app.js' : 'app.[hash].js',
    jsVendorBundle: 'core.[hash].js',
    cssBundle: 'app.[hash].css',
    template: path.resolve(__dirname, '../src/templates/production.html'),
    vendors: [
      'react',
      'redux',
      'react-redux',
      'react-router',
      'react-router-redux'
    ]
  },
  globals: {
    'process.env'  : {
      'NODE_ENV' : JSON.stringify(env)
    },
    __DEV__: __DEV__,
    NODE_ENV : env,
    __DEBUG__: __DEV__,
    __PROD__: env === 'production'
  }
}

module.exports = config
