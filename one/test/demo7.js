let laoyuan = {
    age:30
}
const validator = {
    set(target,key,value){
        if(typeof value != "number"){
            throw new TypeError("年龄必须是数字");
        }
    }
}
const proxy = new Proxy(laoyuan,validator);
proxy.age = "京程一灯";

//meta 