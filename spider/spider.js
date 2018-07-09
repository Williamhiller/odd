/**
 * Created by Williamhiler on 2016/11/22.
 */
var http = require('http');
var jsdom = require("jsdom");
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

module.exports = function (fn) {
    var url = "http://data.nowgoal.com/history/ouChange.aspx?ID=1556495&t1=Sunshine%20Coast%20U20&t2=Western%20Pride%20U20&company=Bet365&companyid=8";
    // var url = "http://vip.win007.com/changeDetail/handicap.aspx?id=1503755&companyID=8&l=0"
    // var url = "http://www.win007.com/index.htm"
    http.get(url, function(res) {
        var html = '';
        // 获取页面数据
        res.on('data', function(data) {
            console.log(90)
            html += data;
        });
        // 数据获取结束
        res.on('end', function() {
            console.log(html);
            var data = parseData(html);
            fn(data)
        });
    }).on('error', function() {
        console.log('获取数据出错！');
    });
};

function parseData(html) {
    // 沿用JQuery风格
    var $ = cheerio.load(html);
    // 通过类名获取章节信息
    var odds = $('#odds').find('tr');
    var data = [];
    odds.each(function () {
        var _this = $(this);
        var json = {};
        var td = _this.find('td');
        if(!_this.hasClass('scoretitle') && !_this.hasClass('Leaguestitle')) {
            json["over"] = td.eq(0).find('font').text();
            json["O"] = td.eq(1).find('font').text();
            json["under"] = td.eq(2).find('font').text();
            json["time"] = eval(td.eq(3).find("script").text());
            json["type"] = td.eq(4).find('font').text();

            data.push(json);
        }
    });
    return data;
}
function showDate(t0,t1,t2,t3,t4,t5) {
    var t = new Date(t0,t1,t2,t3,t4,t5);
    t = new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds()));
    var y=t.getYear();
    var M=t.getMonth()+1;
    var d=t.getDate();
    var h=t.getHours();
    var m=t.getMinutes();
    if(M<10) M="0" + M;
    if(d<10) d="0" + d;
    if(h<10) h="0" + h;
    if(m<10) m="0" + m;
    return (M+"-" + d +" " + h +":" + m)
}

