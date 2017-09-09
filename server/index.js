const Koa = require('koa');
const compress = require('koa-compress')
const send = require('koa-send');
const serve = require('koa-static');
const enforceHttps = require('koa-sslify');
const app = new Koa();

//app.use(enforceHttps());

// $ GET /hello.txt
  app.use(compress({
  filter: function (content_type) {
  	return /text|javascript|json/i.test(content_type)
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))
  app.use(serve('.',{hidden:true}));
  app.use(serve(__dirname+'/../build'));
  app.use(async (ctx) => {
  await send(ctx,  '/build/index.html' );
})

app.listen(8989);

console.log('listening on port 8989');



