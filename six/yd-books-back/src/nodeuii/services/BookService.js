/**
 * @fileOverview 实现Index数据模型
 * @author yuanzhijia@yidengxuetang.com
 */
const SafeRequest = require("../utils/SafeRequest");
/**
 * Index类 获取后台有关于图书相关数据类
 * @class
 */
 class Book{
    /**
     * @constructor
     * @param {string} app KOA2执行的上下文环境 
     */
     constructor(app){}
     /**
      * 获取后台的全部图书数据方法
      * @param {*} options  配置项
      * @example
      * return new Promise
      * getData(url, options)
      */
     getData(options){
        const safeRequest = new SafeRequest("books/index");
        return safeRequest.fetch({});
     }
    /**
      * 获取后台的全部图书数据方法
      * @param {*} options  配置项
      * @example
      * return new Promise
      * saveData(url, options)
      */
     saveData(options){
        const safeRequest = new SafeRequest("books/create");
        return safeRequest.fetch({
            method: 'POST',
            params:options.params
        });
     }
 }
 module.exports = Book;