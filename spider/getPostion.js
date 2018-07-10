/**
 * Created by Williamhiler on 2016/11/22.
 */
var jsdom = require("jsdom");

var url = "http://odds.500.com/fenxi/shuju-733800.shtml";
jsdom.env(
    url,  // 这里可以使用文件系统路径，或者网页链接url
    ["https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"],
    function(err,window) {
        var $ = window.$;
        var data = parseData($);
    }
);

module.exports = function (fn) {

};
function parseData($) {
    console.log($("#zhanji_01 table.pub_table").html())


}


