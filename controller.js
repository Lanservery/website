var fs = require('fs');
var router = require('koa-router')();

function judgeFile(fileArray,controllers){

    for (var file of fileArray) {
        var fileName = require(__dirname + controllers + file);
        for (var content in fileName ) {
            if (content.startsWith('GET')) {
                var path = content.substring(4);
                console.log(path)
                router.get(path,fileName[content]);
            }
            if (content.startsWith('POST')) {
                var path = content.substring(5);
                router.post(path,fileName[content]);
            }
            //if (content.startsWith('INDEX')) {
            //    app.use(fileName[content]);
            //}
        }
    }
}

function scanDir(controllers){

    var file_Scan = fs.readdirSync(__dirname + controllers)
    var file_JS_all = file_Scan.filter((js) =>{
        
            return js.endsWith('.js');
        });
    judgeFile(file_JS_all,controllers);
}

module.exports = function(){

    var controllers = '/controllers/';
    scanDir(controllers);
    return router.routes();
}
