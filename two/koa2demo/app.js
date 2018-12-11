const Koa = require('koa');
const app = new Koa();
const router = require('koa-simple-router');
const convert = require('koa-convert');//koa1转换器
const serve = require('koa-static');
const path = require('path');
const render = require('koa-swig');
var co = require('co');
// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });
app.context.render = co.wrap(render({
    root: path.join(__dirname, 'views'),
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    writeBody: false
}));
app.use(router(_ => {
    _.get('/', (ctx, next) => {
        ctx.body = 'hello'
    })
    _.get('/index', async(ctx, next) => {
        ctx.body = await ctx.render('index')
    })
}))
app.use(serve(path.join(__dirname,'/public')));
app.listen(3000,()=>{
    console.log('start')
})