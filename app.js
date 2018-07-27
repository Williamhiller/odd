/**
 * Created by Williamhiler on 2016/11/22.
 */

var express = require("express");
var app = express();

app.use(express.static('public'));

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log(server.address());

});

// var http = require('http'),
//     fs = require('fs');
// var querystring = require('querystring');
//
// var contentType = require('./server/contentType.json');
// var spider = require('./spider/spider');
// var getPostion = require('./spider/getPostion');
//
// http.createServer(function(req, res){
//
//     var url = req.url,
//         url_a = url.split("."),
//         type = url_a[url_a.length-1];
//     if(req.method == 'GET'){
//         if(contentType[type]) {
//             serve(__dirname + url,contentType[type])
//         }else {
//             if(url.split('?')[0] == '/getData') {
//                 var param = querystring.parse(url.split('?')[1]);
//                 getPostion(param.id,function (data) {
//                     res.writeHead(200,{'Content-Type':contentType["json"]});
//                     res.end(JSON.stringify(data))
//                 });
//             }else {
//                 res.writeHead(404);
//                 res.end("Not Found")
//             }
//         }
//     }
//
//     function serve(path,type) {
//         res.writeHead(200,{'Content-Type':type});
//         fs.createReadStream(path).pipe(res);
//     }
//
// }).listen(8080);