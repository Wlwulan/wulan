const {
    join
} = require("path");
const _ = require("lodash");
console.log("取到的环境变量", process.env.NODE_ENV);
let config = {
    "viewDir":join(__dirname,"..","views"),
    "staticDir":join(__dirname,"..","assets")
}
if(process.env.NODE_ENV == "development"){
    const localConfig = {
        baseUrl : "http://localhost/index.php?r=",
        port:3000
    }
    config = _.extend(config,localConfig);
}
//留给大家 PM2启动
if(process.env.NODE_ENV == "production"){
    const prodConfig = {
        port:8081
    }
    config = _.extend(config,prodConfig);
}
module.exports = config;



