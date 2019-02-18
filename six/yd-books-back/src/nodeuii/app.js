import Koa from "koa";
import serve from 'koa-static';
import config from "./config";
import render from 'koa-swig';
import co from 'co';
import log4js from 'log4js';
import errorHandler from "./middleawares/errorHandler";
import {
    asClass,
    asValue,
    Lifetime,
    createContainer
} from 'awilix';
import {
    scopePerRequest,
    loadControllers
} from 'awilix-koa';
const app = new Koa();
//创建一个容器管理所有的灵魂！！
const container = createContainer();
//把所有的service注册容器
//每一个controller 把需要的Service注入进去
container.loadModules([__dirname + "/services/*.js"], {
    //BookService -> bookService
    formatName: "camelCase",
    registerOptions: {
        lifetime: Lifetime.SCOPED
    }
});
app.use(scopePerRequest(container));
//前端模板
//co的作用是把 *函数全部自动向下执行 next -> next -> done
//async await 语法糖版本 koa-swig 并为KOA2 升级 KOA1 
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    // cache: 'memory', // disable, set to false
    cache: false,
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
app.use(loadControllers(__dirname + "/controllers/*.js", {
    cwd: __dirname
}))
//配置静态资源
app.use(serve(config.staticDir));
app.listen(config.port, () => {
    console.log("服务已启动🍺");
});