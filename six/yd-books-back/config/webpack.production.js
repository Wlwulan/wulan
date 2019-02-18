const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
    join
} = require("path");
const minify = require('html-minifier').minify;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//hash chunkhash contenthash
//1.全站js css 同一个版本号
//2.根据不同的文件生成不同的版本号
//3.contenthash js+css
module.exports = {
    output: {
        filename: "scripts/[name].[contenthash:5].bundule.js"
    },
    plugins: [
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }],
            },
            canPrint: true
        }),
        new CopyWebpackPlugin([{
            from: join(__dirname, "../", "/src/webapp/views/common/layout.html"),
            to: '../views/common/layout.html'
        }]),
        new CopyWebpackPlugin([{
            from: join(__dirname, "../", "/src/webapp/components"),
            to: '../components',
            transform(content) {
                //html hint 优化
                return minify(content.toString("utf-8"), {
                    collapseWhitespace: true
                });
            }
        }], {
            ignore: ['*.js', '*.css']
        })
    ]
}