const path = require('path');
const glob = require('glob');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new PurgecssPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
      extractors: [
        {
          extractor: content => content.match(/[\w-:]+(?<!:)/g),
          extensions: ["html", "js"],
        }
      ],
    }),
  ],
});