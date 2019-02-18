const fetch = require('node-fetch');
const config = require("../config");
//统一代码 处理容错
class SafeRequest {
    constructor(url) {
        this.url = url;
        // this.options = options;
        this.baseURL = config.baseUrl;
    }
    fetch(options) {
        return new Promise((resolve, reject) => {
            //失败
            let result = {
                code: 0, //正常请求状态
                message: "",
                data: []
            };
            let ydfetch = fetch(this.baseURL + this.url);
            if (options.params) {
                ydfetch = fetch(this.baseURL + this.url, {
                    method: options.method,
                    body:options.params
                })
            }
            ydfetch
                // .then((res) => {
                //     try {
                //         return res.json();
                //     } catch (error) {
                //         result.code = 1;
                //         result.message = "解析Json失败";
                //         reject(result)
                //     }
                .then(res => res.json())
                .then((json) => {
                    result.data = json;
                    resolve(result);
                }).catch((error) => {
                    result.code = 1;
                    //mail 服务器 直接打电话 发邮件
                    result.message = "node-fetch请求失败，后端报警!";
                    reject(result)
                })
        })
    }
}
module.exports = SafeRequest;