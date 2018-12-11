var express = require('express')
var app = express()
var swig = require('swig')
app.set('view engine','html')
app.engine('html',swig.renderFile)
var bodyParser = require('body-parser')
app.use(express.static('public'))
var urlencodedParser = bodyParser.urlencoded({
  extended:false
})
app.get('/',function(req,res,next){
  res.render('index',{
    title:'测试首页2'
  })
})


// app.get('/index/b', function (req, res,next) {
//     //res.sendfile(__dirname+'/views/'+'index.html');
//     console.log('next')
//     next()
//  },function(req,res){
//    res.send('from b')
//  })
//  app.post('/index', urlencodedParser, function (req, res) {
//    console.log(req.body.username)
//    res.redirect("https://www.baidu.com/s?wd="+req.body.data)
//  })
 var server = app.listen(8082, function () {
  
   console.log("接口已启动")
  
 })