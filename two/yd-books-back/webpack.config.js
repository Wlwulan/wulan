const merge = require("webpack-merge")
const argv = require("yargs-parser")(process.argv.slice(2))
const _mode = argv.mode||"development"
const _mergeconfig = require("./config/webpack.${_mode}.js")

const webpackConfig = {

}
module.exports = merge(webpackConfig,_mergeConfig)