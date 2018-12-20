'use strict';

const {
    join
} = require("path");
const _ = require("lodash");
console.log("取到的环境变量", "production");
let config = {
    "viewDir":join(__dirname,"..","views"),
    "staticDir":join(__dirname,"..","assets")
};
{
    const prodConfig = {
        port:8081
    };
    config = _.extend(config,prodConfig);
}
module.exports = config;
