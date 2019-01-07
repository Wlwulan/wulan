const IndexController = require("./IndexController");
const TestController = require("./TestController");
const indexControll = new IndexController();
const testController = new TestController();
const router = require('koa-simple-router')
// const init = (app) => {

// }
//初始化所有的路由
module.exports = (app)=>{
    app.use(router(_ => {
        _.get('/', indexControll.actionIndex())
        // index.php?r=index/data
        _.get('/index/savedata', indexControll.actionSaveData());
        _.get('/index/create', indexControll.actionCreate());
    }));
}