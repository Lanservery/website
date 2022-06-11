var nunjucks = require('nunjucks');

function initTemplate(path,opts){
    var
       path = 'views';
       watch = opts.watch || false;
       noCache = opts.noCache || false;
       autoescape = opts.autoescape || true;
       thowOnUndefined = opts.thowOnUndefined || true;

    var env = new nunjucks.Environment(
                    new nunjucks.FileSystemLoader(path,{
                        watch: watch,
                        noCache: noCache
                    }),{
                        autoescape: autoescape,
                        thowOnUndefined: thowOnUndefined
                       })
    if (opts.filters) {
        var filters = opts.filters;
        for (let f in filters) {

            env.addFilter(f,filters[f]);
        }
    }

    return env;
}

function templating(path,opts){
    
    var env = initTemplate(path,{
        noCache: opts.noCache,
        watch: opts.watch,
        autoescape: true,
        thowOnUndefined: true,
        filters:{
            hex: function(n){
                    return '0x' + n.toString(16);
                 }
        }
    })

    return async (ctx,next) =>{
        
        ctx.render = function(view,model){
            
           ctx.response.body  = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
           ctx.response.type = 'text/html';
        };
        await next();
    }
}

module.exports = templating;
