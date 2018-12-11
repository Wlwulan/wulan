const Index = require("../models/Index");
const { URLSearchParams } = require('url');
class IndexController {
    constructor() {

    }
    actionIndex() {
        return async (ctx, next) => {
            // ctx.body = 'hello world'
            //Header由第一次ctx.body设置的
            //输出的内容已最后一次
            const index = new Index();
            const result = await index.getData();
            console.log("整个node系统是否通了", result);
            ctx.body = await ctx.render("index", {
                data: result.data
            });
        }
    }
    actionCreate() {
        return async (ctx, next) => {
            ctx.body = await ctx.render("create");
        }
    }
    actionSaveData() {
        return async(ctx, next) => {
            // ctx.body = {
            //     result: "data"
            // }
            //取到前端发过来的数据
            const index = new Index();
            const params = new URLSearchParams();
            params.append("Books[bookName]", "测试的数据");
            params.append("Books[bookAuthor]", "测试作者");
            const result = await index.saveData({
                params
            });
            ctx.body = result;
        }
    }
}
module.exports = IndexController;