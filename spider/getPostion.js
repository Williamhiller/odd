/**
 * Created by Williamhiler on 2016/11/22.
 */
var http = require('http');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

var url = "http://www.okooo.com/soccer/match/1002081/history/";

http.get(url, function(res) {
    var html = '';
    // 获取页面数据
    res.on('data', function(data) {
        html += data;
    });
    // 数据获取结束
    res.on('end', function() {
        parseData(html)
    });
}).on('error', function(error) {
    console.log(error);
});

module.exports = function (fn) {

};
function parseData(html) {
    // 沿用JQuery风格
    var $ = cheerio.load(html);
    var data = {};
    // 只使用前6条记录
    $("table.homecomp").find('tr[data-lt]').each(function (i) {
        var _this = $(this);
        var index = _this.index();

        console.log(index)
        if(index < 6) {
            // console.log(_this.html())
        }
    })


}


