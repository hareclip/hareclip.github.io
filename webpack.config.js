const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {

  process.env.NODE_ENV = options.mode;

  return {
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
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
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
      new PurgecssPlugin({
        paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
        extractors: [
          {
            extractor: content => content.match(/[\w-:/]+(?<!:)/g),
            extensions: ["html", "js"],
          }
        ],
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'src/assets/images', to: 'assets/images' }]
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    },
  }
};