function route(pathname, response){
    if(pathname == "/"){
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
    }else if(pathname == "/a"){
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("aaa");
        response.end();
    }else{
        response.end('404');
    }
    console.log("About to route a request for " + pathname);
}
exports.route = route