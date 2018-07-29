const fs = require('fs');
const path = require('path');
const router = require('koa-router')();

// 读取 controllers 文件夹下的而所有 js 文件
const controllers = fs.readdirSync(path.resolve(__dirname, '../controllers'));
const controllers_js = controllers.filter(c => c.endsWith('.js'));

// 遍历获取js文件导出的controller，并绑定router
for (const control of controllers_js) {
  const mapping = require(path.resolve(__dirname, '../controllers', control));
  for (let route of mapping) {
    // router.get('/proxy', (ctx, next) => {})
    router[route.methods.toLowerCase()](route.path, route.controller);
  }
}

module.exports = () => router.routes();
