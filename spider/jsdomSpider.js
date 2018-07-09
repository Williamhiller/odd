/**
 * Created by Williamhiler on 2018/6/23.
 */

var jsdom = require("jsdom");

module.exports = function (fn) {
    var url = "http://vip.win007.com/changeDetail/handicap.aspx?id=1482854&companyID=8&l=0";
    jsdom.env(
        url,  // 这里可以使用文件系统路径，或者网页链接url
        ["https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"],
        function(err,window) {
            var $ = window.$;
            var data = parseData($);
            fn(data)
        }
    );
};

function parseData($) {
    // 通过类名获取章节信息
    var odds = $('#odds2').find('tr');
    var data = [];
    odds.each(function () {
        var _this = $(this);
        var json = {};
        var td = _this.find('td');
        if(_this.index() != 0) {
            json.time = td.eq(0).text();
            json.score = td.eq(1).text();
            json.over = td.eq(2).find('b').text();
            json.O = td.eq(3).find('font').text();
            json.under = td.eq(4).find('b').text();
            json.date = td.eq(5).text();
            json.type = td.eq(6).text();
            data.push(json);
        }
    });
    return data;
}