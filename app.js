var Koa = require('koa');
var app = new Koa();
var controller = require('./controller');
var templating = require("./templating");
var staticFiles = require("./static-files");
var bodyParser = require('koa-bodyparser');

const isProduction = process.env.NODE_ENV === 'production';

app.use(async (ctx,next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    await next();
});


// bodyParser 必须在 routers 之前
app.use(bodyParser());
app.use(templating('views',{
    noCache: !isProduction,
    watch: !isProduction
}));
app.use(controller());
app.use(staticFiles('/static/'));

app.listen(3000);
console.log('OK! app is executing...\nOpend http://localhost:3000')
