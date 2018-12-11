var express = require('express')
var app = express()

app.get('/',function(req,res){
    res.send('hello')
})
app.listen(8081,function(){
    console.log('running')
})