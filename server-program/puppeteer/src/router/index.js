const Router = require('koa-router');
const router = new Router();

// 添加cookie
router.get('/addCookie', async (ctx,next) => {
  const { url, cookie } = ctx.request.body;
  console.log(ctx.service)
  const res = await ctx.service.b2Fun(url, cookie);
  // ctx.body = res;
})

// 通配符路由
router.all(/.*/, async (ctx,next) => {
  ctx.body = '404 not found';
})

module.exports = router;
