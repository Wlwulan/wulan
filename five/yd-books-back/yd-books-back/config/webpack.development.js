const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
    join
} = require("path");
module.exports = {
    plugins: [
        new CopyWebpackPlugin([{
            from: join(__dirname, "../", "/src/webapp/views/common/layout.html"),
            to: '../views/common/layout.html'
        }]),
        new CopyWebpackPlugin([{
            from: join(__dirname, "../", "/src/webapp/components"),
            to: '../components'
        }], {
            copyUnmodified: true,
            ignore: ['*.js', '*.css']
        })
    ]
}