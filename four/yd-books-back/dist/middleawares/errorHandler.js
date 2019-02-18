"use strict";

const errorHandler = {
  error(app, logger) {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        logger.error(error);
        ctx.status = error.status || 500;
        ctx.body = error;
      }
    });
    app.use(async (ctx, next) => {
      //1
      await next();

      if (404 != ctx.status) {
        return;
      } //百度K权 
      //ctx.status = 200;


      ctx.status = 404;
      ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="/" homePageName="回到我的主页"></script>';
    });
  }

};
module.exports = errorHandler;