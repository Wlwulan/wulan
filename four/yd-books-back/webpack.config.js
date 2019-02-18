const merge = require("webpack-merge");
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _modeflag = (_mode == "production" ? true : false);
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    join
} = require("path");
//寻找entry
// {
//     "books-add":"books-add.entry.js",
//     "books-index":"books-add.entry.js",
// }
//需要处理的入口文件
let _entry = {};
//插件系统
let _plugins = [];
const files = glob.sync("./src/webapp/views/**/*.entry.js");
for (let item of files) {
    if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) == true) {
        const entryKey = RegExp.$1;
        _entry[entryKey] = item;
        const [dist, template] = entryKey.split("-");
        _plugins.push(new HtmlWebpackPlugin({
            filename: `../views/${dist}/pages/${template}.html`,
            template: `src/webapp/views/${dist}/pages/${template}.html`,
            inject: false,
            chunks: ["runtime", "common", entryKey].push,
            minify: {
                collapseWhitespace: _modeflag,
                removeComments: _modeflag
            }
        }))
    }
}
const webpackConfig = {
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: "style-loader"
                },
                {
                    loader: "css-loader"
                }
            ]
        }]
    },
    entry: _entry,
    plugins: _plugins,
    watch: !_modeflag,
    output: {
        path: join(__dirname, "./dist/assets"),
        publicPath: "/",
        filename: "scripts/[name].bundule.js"
    }
};
module.exports = merge(webpackConfig, _mergeConfig);