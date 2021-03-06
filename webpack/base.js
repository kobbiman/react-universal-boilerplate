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
  resolve: {
    extensions: [ '.js', '.json', '.css', '.scss' ],
    modules: [
      config.compile.entry,
      'node_modules'
    ],
    alias: {
      Actions: config.compile.entry + '/actions'
    }
  },
  plugins: [
    new webpack.DefinePlugin(config.globals)
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: config.compile.entry,
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            'react',
            ['es2015', { modules: false }],
            'stage-0'
          ],
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
        use: [{
          loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=32000&mimetype=application/font-woff'
        }]
      },
      {
        test: /\.woff2(\?.*)?$/,
        use: [{
          loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=32000&mimetype=application/font-woff2'
        }]
      },
      {
        test: /\.otf(\?.*)?$/,
        use: [{
          loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=32000&mimetype=font/opentype'
        }]
      },
      {
        test: /\.ttf(\?.*)?$/,
        use: [{
          loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=32000&mimetype=application/octet-stream'
        }]
      },
      {
        test: /\.eot(\?.*)?$/,
        use: [{
          loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]'
        }]
      },
      {
        test: /\.svg(\?.*)?$/,
        use: [{
          loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=32000&mimetype=image/svg+xml'
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader?limit=8192'
        }]
      }
    ]
  }
}
