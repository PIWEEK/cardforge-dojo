const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',

  resolve: {
    extensions: [ '.ts', '.js' ],
    modules: [ 'node_modules', 'src' ]
  },

  entry: [
    'main.ts'
  ],

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Cardforge - DOJO',
      template: 'src/assets/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      'THREE': 'three'
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'source-map-loader'
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: [
          'babel-loader',
          'awesome-typescript-loader'
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader'
        ],
      }
    ]
  }
}
