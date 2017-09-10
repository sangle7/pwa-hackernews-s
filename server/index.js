const Koa = require('koa');
const compress = require('koa-compress')
const send = require('koa-send');
const serve = require('koa-static');
const proxy = require('koa-proxies')
const app = new Koa();


// $ GET /hello.txt
app.use(compress({
  filter: function (content_type) {
    return /text|javascript|json/i.test(content_type)
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))
app.use(serve('.', {
  hidden: true,
  maxage:720000,
}));
app.use(serve(__dirname + '/../build'));
app.use(proxy('/api/:params', {
  target: `https://node-hnapi.herokuapp.com/`,
  rewrite: path => path.replace(/\/api/, ''),
  changeOrigin: true,
  logs: true
}))
//app.use(async ctx => {

  // var options = {
  //   url: 'https://node-hnapi.herokuapp.com/news?page=1',
  // };

  //var response = await request(options); //Yay, HTTP requests with no callbacks! 
  //var info = JSON.parse(response.body);

  //ctx.body = response;
//});
app.use(async (ctx) => {
  await send(ctx,  '/build/index.html' );
})

app.listen(8989);

console.log('listening on port 8989');