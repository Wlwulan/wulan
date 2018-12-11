//console.log("当前环境变量",process.env.NODE_ENV)
//process.exit()
const Koa = require('koa')
const serve = require('koa-static')
const render = require('koa-swig')
const co = require('co')
const app = new Koa()
const config = require("./config")
const log4js = require('log4js')
const errorHandler = require("./middleawares/errorHandler")
//前端模板
//co作用把*函数全部自动向下执行next-》next-》done
//async await 语法糖版本
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    varControls: ["[[", "]]"],
    ext: 'html',
    writeBody: false
}))
//输出日志
log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: './logs/koa-log.log'
        }
    },
    categories: {
        default: {
            appenders: ['cheese'],
            level: 'error'
        }
    }
});
const logger = log4js.getLogger('cheese')
errorHandler.error(app, logger)
require("./controllers")(app)
//配置静态资源文件
app.use(serve(config.staticDir))
app.listen('3000', () => {
    console.log('start')
})