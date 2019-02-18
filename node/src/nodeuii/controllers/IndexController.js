import {
    route,
    GET
} from 'awilix-koa';
@route("/index")
class IndexController {
    constructor({
        indexService
    }) {
        this.indexService = indexService;
    }
    @GET()
    async actionIndex(ctx,next) {
        const result = await this.indexService.getData();
        ctx.body = result;
        // return async (ctx, next) => {
        //     ctx.body = await ctx.render("index");
        // }
    }
}
module.exports = IndexController;