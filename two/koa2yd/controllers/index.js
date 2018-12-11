//接口测初始化
const IndexController = require("./IndexController")
const indexControll = new IndexController() //类的实例
const TestController = require("./TestController")
const testControll = new TestController()
const router = require('koa-simple-router')
// const init = (app)=>{
    
// }
//初始化所有的路由
module.exports=(app)=>{
    app.use(router(_ =>{
        _.get('/',indexControll.actionIndex())
        _.get('/index/savedata',indexControll.actionSaveData())
        _.get('/index/create',indexControll.actionCreate())
        _.get('/test',testControll.actionIndex())
        _.get('/test/data',testControll.actionData())
    }))
}