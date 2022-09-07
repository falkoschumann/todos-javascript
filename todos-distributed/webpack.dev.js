const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: './public',
    historyApiFallback: true,
    port: 8081,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
