const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // installed via npm
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: {
      index: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: './',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      title: 'Your website'
    })
  ],
  module: {
    rules: [
        {
        test: /\.css$/,
        use: [
          {loader: 'style-loader',},
          {loader: 'css-loader',},
        ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
    ]
  },
};
