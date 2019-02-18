const {
    URLSearchParams
} = require('url');
import {
    route,
    GET
} from 'awilix-koa';
const cheerio = require('cheerio')
@route("/books")
class BooksController {
    //设值注入
    // private bookService;
    //构造注入
    constructor({bookService}) {
        this.bookService = bookService;
    }
    @route("/index")
    @GET()
    async actionIndex(ctx,next) {
        // ctx.body = 'hello world'
        //Header由第一次ctx.body设置的
        //输出的内容已最后一次
        const result = await this.bookService.getData();
        //console.log("整个node系统是否通了", result);
        const html = await ctx.render("books/pages/index", {
            data: result.data
        });
        if (ctx.request.header["x-pjax"]) {
            const $ = cheerio.load(html);
            //我只需要一小段html 基础的核心原理
            ctx.body = $("#js-hooks-data").html();
            // ctx.body = {
            //     html:$("#js-hooks-data").html(),
            //     css: <!-- injectcss -->, $(".lazyload-css")
            //     js: <!-- injectjs -->$(".lazyload-js")
            // } 
            //CSR方式
            //ctx.body = "<x-add></x-add>"
        } else {
            ctx.body = html;
        }
    }
    @route("/create")
    @GET()
    actionCreate() {
        return async (ctx, next) => {
            const html = await ctx.render("books/pages/add");
            if (ctx.request.header["x-pjax"]) {
                //xss
                const $ = cheerio.load(html);
                let _result = ""
                $(".pjaxcontent").each(function () {
                    _result += $(this).html();
                });
                $(".lazyload-css").each(function () {
                    _result += $(this).html();
                })
                //common:widget/apiext/custommarker.js
                $(".lazyload-js").each(function () {
                    //_result += `<script>${$(this).attr("src")}</script>`
                    _result += `<script src="${$(this).attr("src")}"></script>`
                })
                ctx.body = _result;
            } else {
                ctx.body = html;
            }
        }
    }
    @route("/savedata")
    @GET()
    actionSaveData() {
        return async (ctx, next) => {
            const index = new Index();
            const params = new URLSearchParams();
            params.append("Books[name]", "测试的数据");
            params.append("Books[author]", "测试作者");
            const result = await this.bookService.saveData({
                params
            });
            ctx.body = result;
        }
    }
}
export default BooksController;