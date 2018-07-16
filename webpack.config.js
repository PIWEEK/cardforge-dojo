const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const port = 2222;

module.exports = {
  mode: 'development',

  resolve: {
    extensions: [ '.ts', '.js' ],
    modules: [ 'node_modules', 'src' ]
  },

  entry: [
    'webpack-dev-server/client?http://localhost:' + port,
    'webpack/hot/only-dev-server',
    'main.ts'
  ],

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },

  devtool: 'source-map',

  devServer: {
    hot: true,
    port: port,
    stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: false,
        warnings: true,
        publicPath: false
    }
  },

  devtool: 'eval-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Cardforge - DOJO',
      template: 'src/assets/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      'THREE': 'three'
    }),
    new ProgressBarPlugin()
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
