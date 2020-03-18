const Router = require('koa-router');

const config = require('config');

const indexRouter = new Router();

indexRouter.get('/health', async (ctx) => {
  ctx.status = 200;
});

// match all routes but not files (i.e. routes with dots)
indexRouter.get(/^((?!\.).)*$/, async (ctx) => {
  return ctx.render(config.isDev ? 'index-template' : 'index', {
    isDev: config.isDev,
    config: {
      apiUrl: config.apiUrl,
      landingUrl: config.landingUrl,
      webSocketUrl: config.webSocketUrl,
    },
  });
});

module.exports = indexRouter.routes();
