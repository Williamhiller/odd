/**
 * Created by Williamhiler on 2016/11/22.
 */

var phantom = require('phantom');
var cheerio = require('cheerio');
var _ph, _page, _outObj;
var urls = [];

var init = module.exports = function () {

    var url = 'https://www.baidu.com/';
    phantom.create().then(function (ph) {
        _ph = ph;
        return _ph.createPage();
    }).then(function (page) {
        _page = page;
        _page.setting('userAgent','Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36');
        // _page.addCookie({
        //     "domain": ".zhihu.com",
        //     "expires": "Fri, 01 Jan 2038 00:00:00 GMT",
        //     "expiry": 2145916800,
        //     "httponly": false,
        //     "name": "z_c0",
        //     "path": "/",
        //     "secure": false,
        //     "value": "\"2|1:0|10:1525756925|4:z_c0|92:Mi4xRWZ0YkF3QUFBQUFBTUs5a3hFQ0pEU1lBQUFCZ0FsVk5fWUhlV3dBdVlhNF9IS2x4WlNBcUpQZ3ZlbWtYWTQyRWVR|72719190e3bad6871ac5ee738da341fa92688ae597f31b96c7a7c99d51378553\"" //这里省略了，输入自己的value即可
        // });

        _page.on('onResourceRequested', true, function (requestData, networkRequest) {

            console.log(requestData.url);
            if(requestData.url.indexOf('.css') !== -1) {
                networkRequest.abort();
            }
        });

        return _page.open(url);
    }).then(function (status) {
        console.log(status);

        _page.evaluate(function () {
            return window.navigator;
        }).then(function (na) {
            // console.log(na)
        });

        return _page.property("content")
    }).then(function (content) {
        test(content);
    }).catch(function (e) {
        console.log(e)
    }).finally(function () {
        _page.close();
        _ph.exit();
    });
};
init();
function test(html) {
    var $ = cheerio.load(html);
    // console.log($("body").html())
}



