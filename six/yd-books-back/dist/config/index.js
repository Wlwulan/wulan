'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = require('path');
var _ = _interopDefault(require('lodash'));

console.log("取到的环境变量", "production");
let config = {
    "viewDir": path.join(__dirname, "..", "views"),
    "staticDir": path.join(__dirname, "..", "assets")
};
//留给大家 PM2启动
{
    const prodConfig = {
        baseUrl: "http://localhost/basic/web/index.php?r=",
        port: 8081
    };
    config = _.extend(config, prodConfig);
}
module.exports = config;
