// const Koa = require("koa");
// const serve = require('koa-static');
// const app = new Koa();
// const config = require("./config");
// const render = require('koa-swig');
// const co = require('co');
// const log4js = require('log4js');
// const errorHandler = require("./middleawares/errorHandler");
import Koa from 'koa'
import serve from 'koa-static'
const app = new Koa();
import config from './config'
import render from 'koa-swig'
import co from 'co'
import log4js from 'log4js'
import errorHandler from './middleawares/errorHandler'
//前端模板
//co的作用是把 *函数全部自动向下执行 next -> next -> done
//async await 语法糖版本 koa-swig 并为KOA2 升级 KOA1 
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    varControls: ["[[", "]]"],
    ext: 'html',
    writeBody: false
}));
log4js.configure({
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
const logger = log4js.getLogger('cheese');
errorHandler.error(app, logger);
require("./controllers")(app);
//配置静态资源
app.use(serve(config.staticDir));
app.listen(config.port, () => {
    console.log("服务已启动🍺");
});