"use strict";

const {
  join
} = require("path");

const _ = require("lodash");

console.log("取到的环境变量", process.env.NODE_ENV);
let config = {
  "viewDir": join(__dirname, "..", "views"),
  "staticDir": join(__dirname, "..", "assets")
};

if (false) {
  console.log(11111);
}

if (process.env.NODE_ENV == "development") {
  const localConfig = {
    baseUrl: "http://localhost/index.php?r=",
    port: 3000
  };
  config = _.extend(config, localConfig);
} //留给大家 PM2启动
else if (process.env.NODE_ENV == "production") {
    const prodConfig = {
      port: 8081
    };
    config = _.extend(config, prodConfig);
  } else {
    const localConfig = {
      baseUrl: "http://localhost/index.php?r=",
      port: 3000
    };
    config = _.extend(config, localConfig);
  }

module.exports = config;