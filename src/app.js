const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const routesMiddler = require('./middlewares/routes');
const encodeMiddler = require('./middlewares/encodeUrl');

const app = new Koa();

app.use(cors());

app.use(bodyParser());

app.use(encodeMiddler);

app.use(routesMiddler());

app.listen(3000);

app.on('error', (error) => {
  console.warn('app has some error:', error);
});
