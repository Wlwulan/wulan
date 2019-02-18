"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2;

var _awilixKoa = require("awilix-koa");

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

const {
  URLSearchParams
} = require('url');

const cheerio = require('cheerio');

let BooksController = (_dec = (0, _awilixKoa.route)("/books"), _dec2 = (0, _awilixKoa.route)("/index"), _dec3 = (0, _awilixKoa.GET)(), _dec4 = (0, _awilixKoa.route)("/create"), _dec5 = (0, _awilixKoa.GET)(), _dec6 = (0, _awilixKoa.route)("/savedata"), _dec7 = (0, _awilixKoa.GET)(), _dec(_class = (_class2 = class BooksController {
  constructor({
    bookService
  }) {
    this.bookService = bookService;
  }

  async actionIndex(ctx, next) {
    // ctx.body = 'hello world'
    //Header由第一次ctx.body设置的
    //输出的内容已最后一次
    const result = await this.bookService.getData(); //console.log("整个node系统是否通了", result);

    const html = await ctx.render("books/pages/index", {
      data: result.data
    });

    if (ctx.request.header["x-pjax"]) {
      const $ = cheerio.load(html); //我只需要一小段html 基础的核心原理

      ctx.body = $("#js-hooks-data").html(); // ctx.body = {
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

  actionCreate() {
    return async (ctx, next) => {
      const html = await ctx.render("books/pages/add");

      if (ctx.request.header["x-pjax"]) {
        //xss
        const $ = cheerio.load(html);
        let _result = "";
        $(".pjaxcontent").each(function () {
          _result += $(this).html();
        });
        $(".lazyload-css").each(function () {
          _result += $(this).html();
        }); //common:widget/apiext/custommarker.js

        $(".lazyload-js").each(function () {
          //_result += `<script>${$(this).attr("src")}</script>`
          _result += `<script src="${$(this).attr("src")}"></script>`;
        });
        ctx.body = _result;
      } else {
        ctx.body = html;
      }
    };
  }

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
    };
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "actionIndex", [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "actionIndex"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "actionCreate", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "actionCreate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "actionSaveData", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "actionSaveData"), _class2.prototype)), _class2)) || _class);
exports.default = BooksController;