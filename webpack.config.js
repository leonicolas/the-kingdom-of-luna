const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const assetsPath = 'assets'

module.exports = {
    mode: 'development',
    context: path.resolve('src'),

    entry: {
        app: './app/index.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: false,
      port: 9000
    },

    plugins: [
        new CleanWebpackPlugin({
          cleanStaleWebpackAssets: false ,
          dry: true,
          verbose: true,
          cleanOnceBeforeBuildPatterns: ['dist']
        }),
        new HtmlWebpackPlugin({
            title: 'Development',
            template: 'index.html',
            inject: true
        }),
        new CopyWebpackPlugin({
          patterns: [
            { from: assetsPath, to: assetsPath }
          ]
        }),
    ],
}
