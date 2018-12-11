var express = require('express');
var app = express();
var request = require('request');
const cheerio = require('cheerio')
app.get('/',function(req,res){
  request('http://www.jikexueyuan.com', function (error, response, body) {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  if(!error && response.statusCode == 200){
    console.log('body:', body); // Print the HTML for the Google homepage.
    $ = cheerio.load(body)
    res.json({
      'classnum':$(".lesson-classify-nav").length
    })
    res.send('hello')
  }
});
  
})
app.listen(3000)