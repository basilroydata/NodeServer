console.log("Node running index.js ...");
const path = require('path');
const http = require('http');
const fs = require('fs');

const server = http.createServer(function(req,res){
    console.log('>>>>>>>>>',req.url,'<<<<<<<<<<<<<<<<<');
    const url = (req.url == '/')?'index.html':req.url;
    const resource = path.join(__dirname,'PUBLIC',url);
    const extname = path.extname(resource);
    const filepath = (extname === '')?(resource.includes("\\api\\")?resource+'.json':resource+'.html'):resource;
    let contentType = 'text/html';
    switch (extname){
        case '.js': contentType = 'text/javascript';
        break;
        case '.css': contentType = 'text/css';
        break;
        case '.json' : contentType = 'application/json';
        break;
        case '.jpg' : contentType = 'image/jpg';
        break;
        case '.png' : contentType = 'image/png';
        break;
    }
    console.log(filepath);
    fs.readFile(filepath, function (error, content) {
        console.log(error);
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'PUBLIC', '404.html'), function (error, content) {
                    res.writeHead(200, { "ContentType": contentType });
                    res.end(content);
                });
            } else {
                res.writeHead(500);
                res.end('Server error',error.code);
            }
        }
        else {
            res.writeHead(200, { "ContentType": contentType });
            res.end(content);
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT,function(){
    console.log(`Listening on port: ${PORT}...`);
})