var http = require("http");
//匿名函数
http.createServer(function(request,response){
    response.writeHead(200,{"Content-Type":'text/plain'});
    response.write("hello world");
    response.end()
}).listen(8888)
//先定义后传递
// function onRequest(request,response){
//     response.writeHead(200,{"Content-Type":'text/plain'});
//     response.write("hello world");
//     response.end()
// }
//  http.createServer(onRequest).listen(8888)