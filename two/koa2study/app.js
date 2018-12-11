const Koa = require('koa');
const app = new Koa();
const router = require('koa-simple-router');
//const convert = require('koa-convert');//koa1转换器
const server = require('koa-static');
const path = require('path');
const render = require('koa-swig');
const co = require('co');
const mysql = require('mysql');
const fetch = require('node-fetch');
const Rize = require('rize');

//数据库链接
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'books'
  });
connection.connect();
//UI测试
const rize = new Rize()
rize
  .goto('http://localhost:3000/index')
  .saveScreenshot('example.png')
  .end()
//mocha接口测试

//引擎模板
app.context.render = co.wrap(render({
    root: path.join(__dirname, 'views'),
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    writeBody: false
}));
//路由模块
app.use(router(_ => {
    _.get('/', (ctx, next) => {
        fetch('https://www.apiopen.top/novelSearchApi?name=2')
        .then(res => res.json())
        .then(json => console.log(json))
        ctx.body = 'hello'
    })
    _.get('/index', async(ctx, next) => {
        let jsonData = await fetch('http://localhost/index.php?r=books/interface')
            .then(res => res.json())
            .then(json=>json)
        ctx.body =  await ctx.render('index',{
            title:'首页',
            head:'拍库',
            content:jsonData
        })
        
        // fetch('http://localhost:8888/index.php?r=books/interface')
        // .then(res => res.json())
        // .then(json => console.log(body));
    })
    _.get('/addBook', async(ctx, next) => {
        ctx.body = await ctx.render('addBook',{
            title:'新建',
            head:'拍库'
        })
    })
    _.get('/receiveDetail', async(ctx, next) => {
        console.log(ctx.request.query)
        const post = ctx.request.query
        let query = connection.query('INSERT INTO books SET?',post,function(err,result){
            if(err){
                ctx.response.json({
                    success:'no'
                })
            }else{
                ctx.response.json({
                    success:'ok'
                })
            }
        })
        ctx.body = await ctx.render('receiveDetail',{
            title:'ee',
            head:'拍库'
        })
    })
}))
app.use(server(path.join(__dirname,'/public')));
app.listen(3000,()=>{
    console.log('start')
})