const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          'postcss-loader',
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'privacy-policy.html',
      template: 'src/privacy-policy.html',
      chunks: ['privacy-policy'],
    }),
    new HtmlWebpackPlugin({
      filename: 'terms-and-conditions.html',
      template: 'src/terms-and-conditions.html',
      chunks: ['terms-and-conditions'],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/assets/images', to: 'assets/images' }]
    }),
  ],
};