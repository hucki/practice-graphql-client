const Koa = require('koa');
const serve = require('koa-static');
//const router = require('./routes/router');

const app = new Koa();
const port = 3000;
//app.use(router.routes());
app.use(serve('./public'));

app.listen(port, () => {
  console.log(`server running at http://localhost:${port} ⏱`); // eslint-disable-line no-console
})
