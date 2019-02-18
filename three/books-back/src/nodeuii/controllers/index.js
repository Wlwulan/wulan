const IndexController = require("./IndexController");
const TestController = require("./TestController");
const BooksController = require("./BooksController");
const indexControll = new IndexController();
const bookControll = new BooksController();
const testController = new TestController();
const router = require('koa-simple-router')
// const init = (app) => {

// }
//初始化所有的路由
module.exports = (app)=>{
    app.use(router(_ => {
        _.get('/book', indexControll.actionIndex())
        // index.php?r=index/data
        _.get('/book/savedata', bookControll.actionSaveData());
        _.get('/book/add', bookControll.actionCreate());
    }));
}