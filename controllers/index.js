var index =async function( ctx,next ) {
    
    ctx.render('index.html',{
        title: '首页'
    });
    await next();
}

module.exports = {
    'GET /': index
}
