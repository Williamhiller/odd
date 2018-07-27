/**
 * Created by Williamhiler on 2016/11/22.
 */
var jsdom = require("jsdom");
var Q = require("q");

module.exports = function (match,fn) {
    var deferred = Q.defer();

    var url = "http://www.okooo.com/soccer/match/"+match+"/history/";
    jsdom.env(
        url,  // 这里可以使用文件系统路径，或者网页链接url
        ["https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"],
        function(err,window) {
            var $ = window.$;
            var data = parseData($);
            deferred.reject(data);
        }
    );

    return deferred.promise;
};

function parseData($) {

    // 沿用JQuery风格
    var data = {};
    data.dataHome = [];
    data.dataVisit = [];
    data.dataHistory = [];

    // 只使用前10条记录
    $("table.homecomp").find('tr[data-lt]').each(function (i) {
        var score = $(this).find("td").eq(3).attr("attr").split("-");

        if(i < 10) {
            data.dataHome.push({
                l : parseInt(score[0]),
                r : parseInt(score[1])
            })
        }
    });
    $("table.awaycomp").find('tr[data-lt]').each(function (i) {
        var score = $(this).find("td").eq(3).attr("attr").split("-");

        if(i < 10) {
            data.dataVisit.push({
                l : parseInt(score[0]),
                r : parseInt(score[1])
            })
        }
    });
    $("table.vscomp").find('tr[data-lt]').each(function (i) {
        var score = $(this).find("td").eq(3).attr("attr").split("-");

        if(i < 10) {
            data.dataHistory.push({
                l : parseInt(score[0]),
                r : parseInt(score[1])
            })
        }
    });
    console.log(data);
    return data;
}


