const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../src/scripts/index.js')
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../public'), to: 'public' }
    ]),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/index.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'catalog.html',
      template: Path.resolve(__dirname, '../src/catalog.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'faq.html',
      template: Path.resolve(__dirname, '../src/faq.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'privacy.html',
      template: Path.resolve(__dirname, '../src/privacy.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'music-supervision.html',
      template: Path.resolve(__dirname, '../src/music-supervision.html')
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|webm|mp4)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
      {
        test: /\.(html)$/,
        use: ['html-loader']
      }
    ]
  }
};
