var sigin = async function(ctx,next) {

    ctx.render('login.html',{
        title: '登陆'
    });
    await next();
}

var submit = async function(ctx,next) {
    var name = ctx.request.body.email || '';
    var pwd = ctx.request.body.password || '';
    console.log(`Name: ${name} Pwd: ${pwd}`)

    if(pwd == 123456){
        ctx.render('signin-ok.html',{
            name: 'Mr Gan',
            title:'登陆成功'
        })
    }
    else{
        ctx.render('signin-failed.html',{
            title:'登陆失败'
        })
    }
    await next();
}

module.exports = {
    'GET /login': sigin,
    'POST /login': submit
}
