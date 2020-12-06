const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // installed via npm
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');




module.exports = {
  mode: 'development',
  entry: {
      index: './src/index.js',
  },
  devServer: {
    contentBase: './dist',
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
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
    ]
  },
};
