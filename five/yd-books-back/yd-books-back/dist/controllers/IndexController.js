"use strict";

var _dec, _dec2, _class, _class2;

var _awilixKoa = require("awilix-koa");

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

let IndexController = (_dec = (0, _awilixKoa.route)("/index"), _dec2 = (0, _awilixKoa.GET)(), _dec(_class = (_class2 = class IndexController {
  constructor({
    indexService
  }) {
    this.indexService = indexService;
  }

  async actionIndex(ctx, next) {
    const result = await this.indexService.getData();
    ctx.body = result; // return async (ctx, next) => {
    //     ctx.body = await ctx.render("index");
    // }
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "actionIndex", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "actionIndex"), _class2.prototype)), _class2)) || _class);
module.exports = IndexController;