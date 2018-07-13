/**
 * Created by Williamhiler on 2016/11/22.
 */
var cheerio = require('cheerio');
var superagent = require('superagent');

// var url = "http://odds.500.com/fenxi/shuju-733800.shtml";
var url = "http://m.win007.com/analy/Analysis/1510761.htm";
superagent.get('https://cnodejs.org/')
    .end(function (err, sres) {
        if (err) {
            console.log(err);
            return false;
        }
        var $ = cheerio.load(sres.text, {decodeEntities: false});

        console.log($("body").html())

    });



