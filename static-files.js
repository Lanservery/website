var fs = require('mz/fs');
var mime  = require('mime');

function staticFiles(url){
    
    return async (ctx,next) => {
        var reqPath = ctx.request.path;
        
        if (reqPath.startsWith(url)) {
            var realPath = __dirname + reqPath;

            if (await fs.exists(realPath)) {
                ctx.response.type = mime.lookup(reqPath);
                ctx.response.body =await fs.readFile(realPath);
            } else {
                ctx.response.status = 404;
            }
        }
        await next();
    }
}

module.exports = staticFiles;
