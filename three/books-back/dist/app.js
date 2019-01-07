"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _koaSwig = require("koa-swig");

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _errorHandler = require("./middleawares/errorHandler");

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default(); //前端模板
//co的作用是把 *函数全部自动向下执行 next -> next -> done
//async await 语法糖版本 koa-swig 并为KOA2 升级 KOA1 

app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  root: _config2.default.viewDir,
  autoescape: true,
  cache: 'memory',
  // disable, set to false
  varControls: ["[[", "]]"],
  ext: 'html',
  writeBody: false
}));

_log4js2.default.configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: './logs/yd-log.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
});

const logger = _log4js2.default.getLogger('cheese');

_errorHandler2.default.error(app, logger);

require("./controllers")(app); //配置静态资源


app.use((0, _koaStatic2.default)(_config2.default.staticDir));
app.listen(_config2.default.port, () => {
  console.log("服务已启动🍺");
});