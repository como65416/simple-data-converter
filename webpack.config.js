const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: {
    'ChineseConvert': './webpack-main/chinese.js',
    'DateTimeConvert': './webpack-main/date-time.js',
    'ImageDataUrlConvert': './webpack-main/image-data-url.js'
  },
  target: 'electron-renderer',
  output: {
    filename: '[name]-bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: 'dist/'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules|bower_components)/,
        use: ['vue-loader'],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader'],
        }),
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=50000'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: `[name]-bundle.css`,
    }),
    new VueLoaderPlugin()
  ]
};
