const Koa = require('koa');
const { logger, accessLogger } = require('./logger');
const config = require('./config');
const router = require('./router');
const {
  port
} = config;

const app = new Koa();
app.use(router.routes()).use(router.allowedMethods());
app.use(accessLogger());
app.on('error', err => {
  logger.error(err);
});

module.exports = app.listen(port, () => {
  console.log(`app is listening at port ${port}...\nGDS假数据服务已开启...`)
})
