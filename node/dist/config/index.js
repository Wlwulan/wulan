"use strict";

var _path = require("path");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("取到的环境变量", process.env.NODE_ENV);
let config = {
  "viewDir": (0, _path.join)(__dirname, "..", "views"),
  "staticDir": (0, _path.join)(__dirname, "..", "assets")
};

if (process.env.NODE_ENV == "development") {
  const localConfig = {
    baseUrl: "http://localhost/index.php?r=",
    port: 3002
  };
  config = _lodash2.default.extend(config, localConfig);
} //留给大家 PM2启动


if (process.env.NODE_ENV == "production") {
  const prodConfig = {
    port: 8081
  };
  config = _lodash2.default.extend(config, prodConfig);
}

module.exports = config;