import "reflect-metadata";
import {Container, buildProviderModule, InversifyKoaServer} from "./ioc";
import "./ioc/loader";
//IOC 控制反转
const container = new Container();
container.load(buildProviderModule());

let server = new InversifyKoaServer(container);
server.setConfig(app => {
    //设置中间件
    // app.context.render = co.wrap(render({
    //     root: config.viewDir,
    //     autoescape: true,
    //     // cache: 'memory', // disable, set to false
    //     cache: false,
    //     varControls: ["[[", "]]"],
    //     ext: 'html',
    //     writeBody: false
    // }));
})
.setErrorConfig(app=>{
    console.log(app);
})

let app =  server.build();
app.listen(3000,()=>{
    console.log("系统启动成功🍎");
})