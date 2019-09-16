const Router = require('koa-router');
const config = require('config');
const { ACCESS_TOKEN_COOKIE_NAME } = require('../constants');

const indexRouter = new Router();

indexRouter.get('/health', async (ctx) => {
  ctx.status = 200;
});

// match all routes but not files (i.e. routes with dots)
indexRouter.get(/^((?!\.).)*$/, async (ctx) => {
  if (!ctx.cookies.get(ACCESS_TOKEN_COOKIE_NAME)) {
    ctx.redirect(config.landingLoginUrl);
  }

  return ctx.render('index', { isDev: config.isDev });
});

module.exports = indexRouter.routes();
