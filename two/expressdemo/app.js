var express = require('express')
var app = express()
app.use(express.static('public'))
//配置swig
var swig = require('swig')
app.set('view engine','html')
app.engine('html',swig.renderFile)
//链接数据库
var mysql = require('mysql')
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'books'
  });
  connection.connect();
//配置路由
app.get('/index',function(req,res,next){
    res.render('index',{
        title:'第一个express'
    })
})
app.get('/receive',function(req,res,next){
    console.log(req)
    var post = {
        username:req.query.username
    }
    var query = connection.query('INSERT INTO user SET?',post,function(err,result){
        if(err){
            res.json({
                error:'no'
            })
        }else{
            res.json({
                success:'ok'
            })
        }
        
    })

})
//容错机制
app.get('*',function(){
    res.status(404)
    res.send('404')
})
app.use(function(err,req,res,next){
    res.status(500)
    res.send('error')
})
app.listen(8081,function(){
    console.log('running')
})