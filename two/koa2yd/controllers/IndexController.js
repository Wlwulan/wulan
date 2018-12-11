const Index = require("../models/Index")
const { URLSearchParams } = require('url');
class IndexController{
    constructor(){

    }
    actionIndex(){
        return async(ctx,next) =>{
            //Header由默认第一次的为ctx.body设置，输出以最后一次为准
            //ctx.body="hello world"
            const index = new Index()
            const result = await index.getData()
            // if(result.data.length == 0){
            //     result.data=["后台处理失败"]
            // }
            ctx.body = await ctx.render("index",{
                data:result.data
            })
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
            params.append("Books[name]", "测试的数据");
            params.append("Books[author]", "测试作者");
            const result = await index.saveData({
                params
            });
            ctx.body = result;
        }
    }
}
module.exports=IndexController;