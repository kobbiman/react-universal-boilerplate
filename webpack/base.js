import webpack from 'webpack'
import path from 'path'
import config from '../config'

export default {
  devtool: 'source-map',
  entry: {},
  output: {
    path: config.compile.output,
    filename: config.compile.jsBundle,
    publicPath: config.compile.publicPath
  },
  plugins: [
    new webpack.DefinePlugin(config.globals),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: config.compile.entry,
        query: {
          cacheDirectory: true,
          env: {
            production: {
              presets: [ 'react-optimize' ]
            },
            development: {
              plugins: [[
                'react-transform', {
                  'transforms': [
                    {
                      'transform': 'react-transform-catch-errors',
                      'imports': [ 'react', 'redbox-react' ]
                    }
                  ]
                }
              ]]
            }
          }
        }
      },
      {
        test: /\.woff(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=32000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=32000&mimetype=application/font-woff2'
      },
      {
        test: /\.otf(\?.*)?$/,
        loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=32000&mimetype=font/opentype'
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=32000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'file?prefix=fonts/&name=[path][name].[ext]'
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=32000&mimetype=image/svg+xml'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=8192'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  postcss: [
    require('postcss-cssnext')({
      browsers: [
        'last 10 versions',
        '> 1%'
      ]
    })
  ]
}
