
//@author lanwu
const SafeRequest = require("../utils/SafeRequest")
//和后端请求数据
/**
 * Index类，获取后台有关于图书的相关数据类
 * @class
 * */
class Index{
    /**
     * Index类，获取后台有关于图书的相关数据类
     * @constructor
     * @param {string} app koa2执行的上下文环境
     * */
    constructor(app){}
    /**
     * Index类，获取后台有关于图书的相关数据类
     * @param {*} url 接口api
     * @param {*} options 配置项
     * @example
     * return new Promise
     * getData(url,options)
     * */
    getData(options){
        const safeRequest = new SafeRequest("books/index");
        return safeRequest.fetch({})
    }
    /**
     * Index类，获取后台有关于图书的相关数据类
     * @param {*} url 保存数据api
     * @param {*} options 配置项
     * @example
     * return new Promise
     * getData(url,options)
     * */
    saveData(options){
        const safeRequest = new SafeRequest("books/create",{
            methods:'POST',
            params:options.params
        });
        console.log(options.params)
        return safeRequest.fetch({})
    }
}
module.exports = Index